import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { deepEqual, mock, when } from 'ts-mockito';

import { AuthApiService } from '@bunch/auth/api';
import {
  AUTH_CREDENTIALS_STUB,
  AUTH_PASSWORD_CHANGE_STUB,
  AUTH_REGISTER_STUB,
  AUTH_RESPONSE_STUB,
  AUTH_SECRETS_STUB,
} from '@bunch/auth/common';
import { AuthManager } from '@bunch/auth/manager';
import { HTTP_ERROR_STUB } from '@bunch/core/api';
import { providerOf } from '@bunch/core/testing';

import * as AuthActions from './auth.actions';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let actions: Observable<Action>;
  let effects: AuthEffects;
  let authApiServiceMock: AuthApiService;
  let authManagerMock: AuthManager;

  beforeEach(() => {
    authApiServiceMock = mock(AuthApiService);
    authManagerMock = mock(AuthManager);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        providerOf(AuthApiService, authApiServiceMock),
        providerOf(AuthManager, authManagerMock),
      ],
    });
  });

  beforeEach(() => {
    effects = TestBed.inject(AuthEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('a', { a: AuthActions.init() });

      // TODO: Fix
      when(authManagerMock.get()).thenReturn(of(AUTH_RESPONSE_STUB));
      const expected = hot('a', { a: AuthActions.restore({ token: AUTH_RESPONSE_STUB.accessToken }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });

  describe('login$', () => {
    it('should return loginSuccess', () => {
      const action = AuthActions.login({ credentials: AUTH_CREDENTIALS_STUB });
      const completion = AuthActions.loginSuccess({ response: AUTH_RESPONSE_STUB });

      actions = hot('a', { a: action });
      const response = hot('a', { a: AUTH_RESPONSE_STUB });
      const expected = hot('a', { a: completion });
      when(authApiServiceMock.login(deepEqual(AUTH_CREDENTIALS_STUB))).thenReturn(response);
      when(authManagerMock.put(deepEqual(AUTH_RESPONSE_STUB))).thenReturn(hot('a', { a: undefined }));

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return loginFailure', () => {
      const action = AuthActions.login({ credentials: AUTH_CREDENTIALS_STUB });
      const completion = AuthActions.loginFailure({ error: HTTP_ERROR_STUB });

      actions = hot('a', { a: action });
      const response = hot('#', null, HTTP_ERROR_STUB);
      const expected = hot('a', { a: completion });
      when(authApiServiceMock.login(deepEqual(AUTH_CREDENTIALS_STUB))).thenReturn(response);

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('register$', () => {
    it('should return registerSuccess', () => {
      const action = AuthActions.register({ register: AUTH_REGISTER_STUB });
      const completion = AuthActions.registerSuccess({ response: AUTH_RESPONSE_STUB });

      actions = hot('a', { a: action });
      const response = hot('a', { a: AUTH_RESPONSE_STUB });
      const expected = hot('a', { a: completion });
      when(authApiServiceMock.register(deepEqual(AUTH_REGISTER_STUB))).thenReturn(response);
      when(authManagerMock.put(deepEqual(AUTH_RESPONSE_STUB))).thenReturn(hot('a', { a: undefined }));

      expect(effects.register$).toBeObservable(expected);
    });

    it('should return registerFailure', () => {
      const action = AuthActions.register({ register: AUTH_REGISTER_STUB });
      const completion = AuthActions.registerFailure({ error: HTTP_ERROR_STUB });

      actions = hot('a', { a: action });
      const response = hot('#', null, HTTP_ERROR_STUB);
      const expected = hot('a', { a: completion });
      when(authApiServiceMock.register(deepEqual(AUTH_REGISTER_STUB))).thenReturn(response);

      expect(effects.register$).toBeObservable(expected);
    });
  });

  describe('reset$', () => {
    it('should return resetSuccess', () => {
      const action = AuthActions.reset({ secrets: AUTH_SECRETS_STUB });
      const completion = AuthActions.resetSuccess();

      actions = hot('a', { a: action });
      const response = hot('a', { a: AUTH_RESPONSE_STUB });
      const expected = hot('a', { a: completion });
      when(authApiServiceMock.reset(deepEqual(AUTH_SECRETS_STUB))).thenReturn(response);

      expect(effects.reset$).toBeObservable(expected);
    });

    it('should return resetFailure', () => {
      const action = AuthActions.reset({ secrets: AUTH_SECRETS_STUB });
      const completion = AuthActions.resetFailure({ error: HTTP_ERROR_STUB });

      actions = hot('a', { a: action });
      const response = hot('#', null, HTTP_ERROR_STUB);
      const expected = hot('a', { a: completion });
      when(authApiServiceMock.reset(deepEqual(AUTH_SECRETS_STUB))).thenReturn(response);

      expect(effects.reset$).toBeObservable(expected);
    });
  });
  describe('changePassword$', () => {
    it('should return changePasswordSuccess', () => {
      const action = AuthActions.changePassword({ passwordChange: AUTH_PASSWORD_CHANGE_STUB });
      const completion = AuthActions.changePasswordSuccess();

      actions = hot('a', { a: action });
      const response = hot('a', { a: AUTH_RESPONSE_STUB });
      const expected = hot('a', { a: completion });
      when(authApiServiceMock.changePassword(deepEqual(AUTH_PASSWORD_CHANGE_STUB))).thenReturn(response);

      expect(effects.changePassword$).toBeObservable(expected);
    });

    it('should return changePasswordFailure', () => {
      const action = AuthActions.changePassword({ passwordChange: AUTH_PASSWORD_CHANGE_STUB });
      const completion = AuthActions.changePasswordFailure({ error: HTTP_ERROR_STUB });

      actions = hot('a', { a: action });
      const response = hot('#', null, HTTP_ERROR_STUB);
      const expected = hot('a', { a: completion });
      when(authApiServiceMock.changePassword(deepEqual(AUTH_PASSWORD_CHANGE_STUB))).thenReturn(response);

      expect(effects.changePassword$).toBeObservable(expected);
    });
  });
});
