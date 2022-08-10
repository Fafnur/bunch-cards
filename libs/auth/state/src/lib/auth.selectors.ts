import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AUTH_FEATURE_KEY, AuthState } from './auth.reducer';

const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectLogged = createSelector(selectAuthState, (state) => state.logged);

export const selectToken = createSelector(selectAuthState, (state) => state.token);
