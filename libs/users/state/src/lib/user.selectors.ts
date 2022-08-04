import { createFeatureSelector, createSelector } from '@ngrx/store';

import { USER_FEATURE_KEY, UserState } from './user.reducer';

const selectUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const selectUser = createSelector(selectUserState, (state) => state.user);
