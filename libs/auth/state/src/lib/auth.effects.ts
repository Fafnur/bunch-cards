import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';

import { AuthApiService } from '@bunch/auth/api';

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects implements OnInitEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.init),
      fetch({
        run: () => this.authApiService.login(credentials).pipe(map((response) => AuthActions.loginSuccess({ response }))),
        onError: (action, error) => AuthActions.loginFailure({ error }),
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      fetch({
        run: ({ credentials }) => this.authApiService.login(credentials).pipe(map((response) => AuthActions.loginSuccess({ response }))),
        onError: (action, error) => AuthActions.loginFailure({ error }),
      })
    );
  });

  constructor(private readonly actions$: Actions, private readonly authApiService: AuthApiService) {}

  ngrxOnInitEffects(): Action {
    return AuthActions.init();
  }
}
