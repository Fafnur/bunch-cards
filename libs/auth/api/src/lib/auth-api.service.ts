import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthCredentials, AuthPasswordChange, AuthRegister, AuthResponse, AuthSecrets } from '@bunch/auth/common';
import { ApiService } from '@bunch/core/api';

export const AUTH_API_ROUTES = {
  login: '/auth/login',
  reset: '/auth/reset',
  changePassword: '/auth/change-password',
  register: '/auth/register',
};

@Injectable()
export class AuthApiService {
  constructor(private readonly apiService: ApiService) {}

  login(credentials: AuthCredentials): Observable<AuthResponse> {
    return this.apiService.post(AUTH_API_ROUTES.login, credentials);
  }

  reset(secrets: AuthSecrets): Observable<void> {
    return this.apiService.post(AUTH_API_ROUTES.reset, secrets);
  }

  register(register: AuthRegister): Observable<AuthResponse> {
    return this.apiService.post(AUTH_API_ROUTES.register, register);
  }

  changePassword(passwordChange: AuthPasswordChange): Observable<AuthResponse> {
    return this.apiService.post(AUTH_API_ROUTES.changePassword, passwordChange);
  }
}
