import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable, take } from 'rxjs';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'google-require-token',
  standalone: true,
  imports: [CommonModule , RouterModule],
  templateUrl: './require-token.component.html',
  styleUrls: ['./require-token.component.scss']
})
export class RequireTokenComponent {
  protected readonly tokenReady$: Observable<boolean | null>;
  constructor(private readonly tokenService: TokenService) {
    this.tokenReady$ = this.tokenService.tokenReady$;
  }

  async onForceExpired(): Promise<void> {
    return this.tokenService.froceExpired();
  }

  async onDeleteToken(): Promise<void> {
    return this.tokenService.deleteToken();
  }
  onLogin(): void {
    this.tokenService
      .getAuthorizationURL()
      .pipe(take(1))
      .subscribe((url) => {
        location.href = `${url}`;
      });
  }

}
