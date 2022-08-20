import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import {
  AUTH_CREDENTIALS_STUB,
  AUTH_PASSWORD_CHANGE_STUB,
  AUTH_REGISTER_STUB,
  AUTH_RESPONSE_STUB,
  AUTH_SECRETS_STUB,
} from '@bunch/auth/common';
import { HTTP_ERROR_STUB } from '@bunch/core/api';

import * as AuthActions from './auth.actions';
import { AuthFacade } from './auth.facade';
import { AUTH_FEATURE_KEY, initialAuthState } from './auth.reducer';
import { selectLogged, selectToken } from './auth.selectors';

describe('Auth Facade', () => {
  let facade: AuthFacade;
  let actions: Observable<unknown>;
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AuthFacade,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: { [AUTH_FEATURE_KEY]: initialAuthState },
          selectors: [
            { selector: selectToken, value: AUTH_RESPONSE_STUB.accessToken },
            { selector: selectLogged, value: true },
          ],
        }),
      ],
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(AuthFacade);

    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  it('should return logged$', () => {
    const expected = hot('a', { a: true });

    expect(facade.logged$).toBeObservable(expected);
  });

  it('should return token$', () => {
    const expected = hot('a', { a: AUTH_RESPONSE_STUB.accessToken });

    expect(facade.token$).toBeObservable(expected);
  });

  it('login() should dispatch action', () => {
    facade.login(AUTH_CREDENTIALS_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.login({ credentials: AUTH_CREDENTIALS_STUB }));
  });

  it('register() should dispatch action', () => {
    facade.register(AUTH_REGISTER_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.register({ register: AUTH_REGISTER_STUB }));
  });

  it('reset() should dispatch action', () => {
    facade.reset(AUTH_SECRETS_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.reset({ secrets: AUTH_SECRETS_STUB }));
  });

  it('oauth() should dispatch action', () => {
    facade.oauth(AUTH_RESPONSE_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.oauth({ response: AUTH_RESPONSE_STUB }));
  });

  it('changePassword() should dispatch action', () => {
    facade.changePassword(AUTH_PASSWORD_CHANGE_STUB);

    expect(dispatchSpy).toHaveBeenCalledWith(AuthActions.changePassword({ passwordChange: AUTH_PASSWORD_CHANGE_STUB }));
  });

  it('should emit loginSuccess$', () => {
    const action = AuthActions.loginSuccess({ response: AUTH_RESPONSE_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: AUTH_RESPONSE_STUB });

    expect(facade.loginSuccess$).toBeObservable(expected);
  });

  it('should emit loginFailure$', () => {
    const action = AuthActions.loginFailure({ error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.loginFailure$).toBeObservable(expected);
  });

  it('should emit registerSuccess$', () => {
    const action = AuthActions.registerSuccess({ response: AUTH_RESPONSE_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: AUTH_RESPONSE_STUB });

    expect(facade.registerSuccess$).toBeObservable(expected);
  });

  it('should emit registerFailure$', () => {
    const action = AuthActions.registerFailure({ error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.registerFailure$).toBeObservable(expected);
  });

  it('should emit resetSuccess$', () => {
    const action = AuthActions.resetSuccess();

    actions = hot('a', { a: action });
    const expected = hot('a', { a: undefined });

    expect(facade.resetSuccess$).toBeObservable(expected);
  });

  it('should emit resetFailure$', () => {
    const action = AuthActions.resetFailure({ error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.resetFailure$).toBeObservable(expected);
  });

  it('should emit changePasswordSuccess$', () => {
    const action = AuthActions.changePasswordSuccess();

    actions = hot('a', { a: action });
    const expected = hot('a', { a: undefined });

    expect(facade.changePasswordSuccess$).toBeObservable(expected);
  });

  it('should emit changePasswordFailure$', () => {
    const action = AuthActions.changePasswordFailure({ error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: HTTP_ERROR_STUB });

    expect(facade.changePasswordFailure$).toBeObservable(expected);
  });

  it('should emit oauthSuccess$', () => {
    const action = AuthActions.oauthSuccess({ response: AUTH_RESPONSE_STUB });

    actions = hot('a', { a: action });
    const expected = hot('a', { a: AUTH_RESPONSE_STUB });

    expect(facade.oauthSuccess$).toBeObservable(expected);
  });
});
