import { HttpClient } from '@angular/common/http';

import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, switchMap, from, map, pipe, throwError, of, BehaviorSubject, distinctUntilChanged, debounceTime, share } from 'rxjs';
import { Configuration, Storage } from '../models';
import {
  AccessTokenNotFound,
  ConfigurationToken,
  SecurityTokenNotFound,
  StateData,
  StorageToken,
  TokenData,
} from '../models/services';
import { arrayBufferToBase64, randomString, sha256 } from '../utils';

const oathURL = 'https://oauth2.googleapis.com/token';
const consentURL = 'https://accounts.google.com/signin/oauth';

const tokenKeyName = 'google-token';
const stateKeyPrefix = 'google-state';

const verifierCodeLength = 56;
const sercurityTokenLength = 16;

const stateTTL = 10 * 60 * 1_000;
const networktime = 2 * (5 * 1_000);

type TokenDataLoadingResult =
    {
      type: 'none';
    }|
    {
      type: 'allowed';
      tokenData: TokenData;
    }|
    {
      type: 'refresh';
      refreshToken: string;
    };
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  deleteToken(): void | PromiseLike<void> {
    throw new Error('Method not implemented.');
  }
  froceExpired(): void | PromiseLike<void> {
    throw new Error('Method not implemented.');
  }
  private readonly storeTokenDataPipe = pipe(
    switchMap((tokenData: TokenData) => from(this.storageTokenData(tokenData))),
  );

  private readonly tokenReadySubject = new BehaviorSubject<boolean | null>(null,
    );

  readonly tokenReady$  = this.tokenReadySubject.asObservable().pipe(debounceTime(100), distinctUntilChanged());

  constructor(
    @Inject(ConfigurationToken) private readonly configuration: Configuration,
    @Inject(StorageToken) private readonly storage: Storage,
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {
    this.getAvailableTokenData().then((result) => {
      if( this.tokenReadySubject.value === null) {
        this.tokenReadySubject.next(result.type !== 'none');
      }
    });
  }

  private async storageTokenData(tokenData: TokenData): Promise<TokenData> {
    const currentTime = Date.now();
    const storedTokenData = { ...tokenData };
    const existingTokenData = await this.loadTokenData();


    if (!storedTokenData.refresh_token && existingTokenData?.refresh_token) {
      storedTokenData.refresh_token = existingTokenData.refresh_token;
    }

    if( storedTokenData.expiredAt === undefined) {
      storedTokenData.expiredAt = currentTime + storedTokenData.expires_in * 1_000 - networktime ;
    }

    await this.storage.storeData(tokenKeyName, storedTokenData);
    this.tokenReadySubject.next(true);
    return  storedTokenData;
  }

  private async loadTokenData(): Promise<TokenData | null> {
    return this.storage.loadData(tokenKeyName);
  }

  private async storeState(
    securityToken: string,
    stateData: StateData,
  ): Promise<StateData> {
    const currentTime = Date.now();
    const storeStateData = {...stateData};

    if (stateData.expiredAt === undefined) {
      storeStateData.expiredAt = currentTime + stateTTL;
    }
    await this.storage.storeData(
      `${stateKeyPrefix}${securityToken}`,
      storeStateData,
    );
    return storeStateData;
  }

  private async loadState(securityToken: string): Promise<StateData | null> {
    const currentTime = Date.now();

    for (const key of await this.storage.loadKeys()) {
      if (key.startsWith(stateKeyPrefix)) {
        const data = await this.storage.loadData<StateData>(key);
        if ((data?.expiredAt ?? 0) < currentTime) {
          await this.storage.removeData(key);
        }
      }
    }

    return this.storage.loadData(`${stateKeyPrefix}${securityToken}`);
  }
  private async removeState(securityToken: string):Promise<StateData | null> {
    const existingStatData = await this.loadState(securityToken);


    await this.storage.removeData(`${stateKeyPrefix}${securityToken}`);
    return existingStatData;
  }

  private refreshTokenData(refreshToken: string): Observable<TokenData> {
    return this.http
      .post<TokenData>(oathURL, {
        client_id: this.configuration.client_id,
        client_secret: this.configuration.client_secret,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      })
      .pipe(this.storeTokenDataPipe);
  }

  exchangeCodeForToken(code: string, securitytoken: string, errorMessage?: string
    ):Observable<StateData> {
    return from(this.loadState(securitytoken)).pipe(
      switchMap((stateData) => {
        if(errorMessage) {
          return throwError(() =>errorMessage);
        }

        return of(stateData);
      }),
      switchMap((stateData) => {
        console.debug(stateData);
        if(stateData) {
          return this.http.post<TokenData>(oathURL, {
            client_id: this.configuration.client_id,
            client_secret: this.configuration.client_secret,
            code: code,
            code_verifier: stateData.verifierCode,
            grant_type: 'authorization_code',
            redirect_uri: this.configuration.redirect_uri,

          }).pipe(
            this.storeTokenDataPipe,
            map(() => stateData),
          );

        }

        return throwError(() => new SecurityTokenNotFound(securitytoken));
      })

    );
  }


  getAuthorizationURL(): Observable<URL> {
    const verifierCode = randomString(verifierCodeLength);

    return from(sha256(verifierCode)).pipe(
      map((binary) => arrayBufferToBase64(binary, true)),
      switchMap((challengeCode) => {
        const securityToken = randomString(sercurityTokenLength);

        return from(
          this.storeState(securityToken, {
            verifierCode: verifierCode,
            redirectUrl: this.router.url,
          }),
        ).pipe(map(() => ({ challengeCode, securityToken })));
      }),
      map(({ challengeCode, securityToken }) => {
        const url = new URL(consentURL);

        url.searchParams.set('client_id', this.configuration.client_id);
        url.searchParams.set('redirect_uri', this.configuration.redirect_uri);
        url.searchParams.set('response_type', 'code');
        url.searchParams.set('scope', this.configuration.scopes.join(' '));
        url.searchParams.set('code_challenge', challengeCode);
        url.searchParams.set('code_challenge_method', 'S256');
        url.searchParams.set(
          'state',
          new URLSearchParams({
            security_token: securityToken,
          }).toString(),
        );

        url.searchParams.append('prompt', 'consent');
        url.searchParams.append('access_type', 'offline');

        return url;
      }),
    );
  }
  private async getAvailableTokenData(): Promise<TokenDataLoadingResult> {
    const tokenData = await this.loadTokenData();

    const currentTime = Date.now();

    if (tokenData) {
      if ((tokenData.expiredAt ?? 0) > currentTime) {
        return {
          type: 'allowed' ,
          tokenData: tokenData,
        };
      }
    }
    return { type: 'none'};
  }
  private tryLoadingTokenData(): Observable<TokenData | null> {
    return from (this.getAvailableTokenData()).pipe(
      switchMap((result) => {
        if(result.type === 'none') {
          return of(null);
        } else if (result.type === 'allowed') {
          return of(result.tokenData);
        }else {
          return this.refreshTokenData(result.refreshToken);
        }
      }),
      share(),
    );
  }

  getAccessToken(): Observable<string | null> {
    return from(this.tryLoadingTokenData()).pipe(
      map((tokenData) => tokenData?.access_token ?? null),
    );
  }

  getAuthorizationHeader(): Observable<string> {
    return from(this.tryLoadingTokenData()).pipe(
      switchMap((tokenData) => {
        if(tokenData) {

          return of(`${tokenData.token_type} ${tokenData.access_token}`);
         }
         return throwError(() => new AccessTokenNotFound());
      }));
  }


}
