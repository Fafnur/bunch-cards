import { USER_STUB } from '@bunch/users/common';

import { initialUserState, UserState } from './user.reducer';
import * as UserSelectors from './user.selectors';

describe('User Selectors', () => {
  const getState = (data?: Partial<UserState>) => ({ ...initialUserState, ...data });

  let state: UserState;

  it('selectUser() should return user', () => {
    state = getState({ user: USER_STUB });
    const result = UserSelectors.selectUser.projector(state);

    expect(result?.id).toBe(USER_STUB.id);
  });
});
