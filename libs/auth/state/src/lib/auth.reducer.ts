import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  logged: boolean | null;
  token: string | null;
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialAuthState: AuthState = {
  logged: null,
  token: null,
};

const reducer = createReducer(
  initialAuthState,
  on(
    AuthActions.restore,
    (state, { token }): AuthState => ({
      ...state,
      token,
      logged: !!token,
    })
  ),
  on(
    AuthActions.loginSuccess,
    AuthActions.registerSuccess,
    (state, { response }): AuthState => ({
      ...state,
      token: response.accessToken,
      logged: true,
    })
  ),
  on(
    AuthActions.logout,
    (state): AuthState => ({
      ...state,
      token: null,
      logged: false,
    })
  )
);

export function authReducer(state: AuthState | undefined, action: Action): AuthState {
  return reducer(state, action);
}
