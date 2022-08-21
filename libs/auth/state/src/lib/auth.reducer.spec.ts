import { Action } from '@ngrx/store';

import { AUTH_RESPONSE_STUB } from '@bunch/auth/common';

import * as AuthActions from './auth.actions';
import { authReducer, AuthState, initialAuthState } from './auth.reducer';

describe('Auth Reducer', () => {
  const getState = (data?: Partial<AuthState>) => ({ ...initialAuthState, ...data });
  let state: AuthState;

  beforeEach(() => {
    state = getState();
  });

  it('loginSuccess() should set logged and token', () => {
    const action = AuthActions.restore({ token: AUTH_RESPONSE_STUB.accessToken });

    const result = authReducer(state, action);

    expect(result.logged).toBeTruthy();
    expect(result.token).toBe(AUTH_RESPONSE_STUB.accessToken);
  });

  it('loginSuccess() should set logged and token', () => {
    const action = AuthActions.loginSuccess({ response: AUTH_RESPONSE_STUB });

    const result = authReducer(state, action);

    expect(result.logged).toBeTruthy();
    expect(result.token).toBe(AUTH_RESPONSE_STUB.accessToken);
  });

  it('registerSuccess() should set logged and token', () => {
    const action = AuthActions.registerSuccess({ response: AUTH_RESPONSE_STUB });

    const result = authReducer(state, action);

    expect(result.logged).toBeTruthy();
    expect(result.token).toBe(AUTH_RESPONSE_STUB.accessToken);
  });

  it('changePasswordSuccess() should set logged and token', () => {
    const action = AuthActions.changePasswordSuccess({ response: AUTH_RESPONSE_STUB });

    const result = authReducer(state, action);

    expect(result.logged).toBeTruthy();
    expect(result.token).toBe(AUTH_RESPONSE_STUB.accessToken);
  });

  it('oauthSuccess() should set logged and token', () => {
    const action = AuthActions.oauthSuccess({ response: AUTH_RESPONSE_STUB });

    const result = authReducer(state, action);

    expect(result.logged).toBeTruthy();
    expect(result.token).toBe(AUTH_RESPONSE_STUB.accessToken);
  });

  it('should return the previous state', () => {
    const action = {} as Action;

    const result = authReducer(initialAuthState, action);

    expect(result).toBe(initialAuthState);
  });
});
