import { Action } from '@ngrx/store';

import { USER_STUB } from '@bunch/users/common';

import * as UserActions from './user.actions';
import { initialUserState, userReducer, UserState } from './user.reducer';

describe('User Reducer', () => {
  const getState = (data?: Partial<UserState>) => ({ ...initialUserState, ...data });

  let state: UserState;

  beforeEach(() => {
    state = getState();
  });

  it('loadSuccess() should set user', () => {
    const action = UserActions.loadSuccess({ user: USER_STUB });
    const result = userReducer(state, action);

    expect(result.user?.id).toBe(USER_STUB.id);
  });

  it('changeSuccess() should set user', () => {
    const action = UserActions.changeSuccess({ user: USER_STUB });
    const result = userReducer(state, action);

    expect(result.user?.id).toBe(USER_STUB.id);
  });

  it('restore() should set user', () => {
    const action = UserActions.restore({ user: USER_STUB });
    const result = userReducer(state, action);

    expect(result.user?.id).toBe(USER_STUB.id);
  });

  it('should return the previous state', () => {
    const action = {} as Action;

    const result = userReducer(initialUserState, action);

    expect(result).toBe(initialUserState);
  });
});
