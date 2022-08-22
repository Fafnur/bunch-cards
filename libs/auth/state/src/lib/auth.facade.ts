import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { AuthCredentials, AuthPasswordChange, AuthRegister, AuthResponse, AuthSecrets } from '@bunch/auth/common';

import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';

@Injectable()
export class AuthFacade {
  logged$ = this.store.select(AuthSelectors.selectLogged);

  token$ = this.store.select(AuthSelectors.selectToken);

  loginSuccess$ = this.actions.pipe(
    ofType(AuthActions.loginSuccess),
    map(({ response }) => response)
  );

  loginFailure$ = this.actions.pipe(
    ofType(AuthActions.loginFailure),
    map(({ error }) => error)
  );

  registerSuccess$: Observable<void> = this.actions.pipe(
    ofType(AuthActions.registerSuccess),
    map(() => undefined)
  );

  registerFailure$ = this.actions.pipe(
    ofType(AuthActions.registerFailure),
    map(({ error }) => error)
  );

  resetSuccess$: Observable<void> = this.actions.pipe(
    ofType(AuthActions.resetSuccess),
    map(() => undefined)
  );

  resetFailure$ = this.actions.pipe(
    ofType(AuthActions.resetFailure),
    map(({ error }) => error)
  );

  changePasswordSuccess$ = this.actions.pipe(
    ofType(AuthActions.changePasswordSuccess),
    map(({ response }) => response)
  );

  changePasswordFailure$ = this.actions.pipe(
    ofType(AuthActions.changePasswordFailure),
    map(({ error }) => error)
  );

  logoutSuccess$: Observable<void> = this.actions.pipe(
    ofType(AuthActions.logoutSuccess),
    map(() => undefined)
  );

  oauthSuccess$ = this.actions.pipe(
    ofType(AuthActions.oauthSuccess),
    map(({ response }) => response)
  );

  oauthFailure$ = this.actions.pipe(
    ofType(AuthActions.oauthFailure),
    map(({ error }) => error)
  );

  confirmEmailSuccess$ = this.actions.pipe(
    ofType(AuthActions.confirmEmailSuccess),
    map(({ response }) => response)
  );

  confirmEmailFailure$ = this.actions.pipe(
    ofType(AuthActions.confirmEmailFailure),
    map(({ error }) => error)
  );

  constructor(private readonly actions: Actions, private readonly store: Store) {}

  oauth(response: AuthResponse): void {
    this.store.dispatch(AuthActions.oauth({ response }));
  }

  confirmEmail(token: string): void {
    this.store.dispatch(AuthActions.confirmEmail({ token }));
  }

  login(credentials: AuthCredentials): void {
    this.store.dispatch(AuthActions.login({ credentials }));
  }

  register(register: AuthRegister): void {
    this.store.dispatch(AuthActions.register({ register }));
  }

  reset(secrets: AuthSecrets): void {
    this.store.dispatch(AuthActions.reset({ secrets }));
  }

  changePassword(passwordChange: AuthPasswordChange): void {
    this.store.dispatch(AuthActions.changePassword({ passwordChange }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
