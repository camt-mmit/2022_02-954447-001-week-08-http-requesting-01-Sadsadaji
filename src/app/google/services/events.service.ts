import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { EventQueryParams, EventsList } from '../models';
import { TokenService } from './token.service';

const url = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
 constructor(
  private readonly tokenService: TokenService,
  private readonly http: HttpClient,
 ) {}

 getAll(params?: EventQueryParams): Observable<EventsList> {
  return this.tokenService.getAuthorizationHeader().pipe(
    switchMap((authorizationHeader) =>
    this.http.get<EventsList>(url,{
      headers: {
        Authorization: authorizationHeader,
      },
      params: params,
    }),
    ),

  );
 }
}
