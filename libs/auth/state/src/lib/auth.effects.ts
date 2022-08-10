import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { map, take, tap } from 'rxjs';

import { AuthApiService } from '@bunch/auth/api';
import { AuthManager } from '@bunch/auth/manager';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects implements OnInitEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.init),
      fetch({
        run: () =>
          this.authManager.get().pipe(
            take(1),
            map((response) => AuthActions.restore({ token: response?.accessToken ?? null }))
          ),
        onError: (action, error) => console.error(error),
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      fetch({
        run: ({ credentials }) =>
          this.authApiService.login(credentials).pipe(
            tap((response) => this.authManager.put(response)),
            map((response) => AuthActions.loginSuccess({ response }))
          ),
        onError: (action, error) => AuthActions.loginFailure({ error }),
      })
    );
  });

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.register),
      fetch({
        run: ({ register }) =>
          this.authApiService.register(register).pipe(
            tap((response) => this.authManager.put(response)),
            map((response) => AuthActions.registerSuccess({ response }))
          ),
        onError: (action, error) => AuthActions.registerFailure({ error }),
      })
    );
  });

  reset$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.reset),
      fetch({
        run: ({ secrets }) => this.authApiService.reset(secrets).pipe(map(() => AuthActions.resetSuccess())),
        onError: (action, error) => AuthActions.resetFailure({ error }),
      })
    );
  });

  changePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.changePassword),
      fetch({
        run: ({ passwordChange }) =>
          this.authApiService.changePassword(passwordChange).pipe(map(() => AuthActions.changePasswordSuccess())),
        onError: (action, error) => AuthActions.changePasswordFailure({ error }),
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly authManager: AuthManager,
    private readonly authApiService: AuthApiService
  ) {}

  ngrxOnInitEffects(): Action {
    return AuthActions.init();
  }
}
