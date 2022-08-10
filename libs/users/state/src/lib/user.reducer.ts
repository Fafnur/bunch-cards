import { Action, createReducer, on } from '@ngrx/store';

import { User } from '@bunch/users/common';

import * as UserActions from './user.actions';

export const USER_FEATURE_KEY = 'user';

export interface UserState {
  user: User | null;
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const initialUserState: UserState = {
  user: null,
};

const reducer = createReducer(
  initialUserState,
  on(
    UserActions.restore,
    UserActions.loadSuccess,
    UserActions.changeSuccess,
    (state, { user }): UserState => ({
      ...state,
      user,
    })
  )
);

export function userReducer(state: UserState | undefined, action: Action): UserState {
  return reducer(state, action);
}
