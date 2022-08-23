import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { mock } from 'ts-mockito';

import { providerOf } from '@bunch/core/testing';
import { GroupManager } from '@bunch/groups/manager';
import { USER_STUB } from '@bunch/users/common';
import { selectUser } from '@bunch/users/state';

import * as GroupActions from './group.actions';
import { GroupEffects } from './group.effects';
import { GROUP_FEATURE_KEY, initialGroupState } from './group.reducer';

describe('GroupEffects', () => {
  let actions: Observable<Action>;
  let effects: GroupEffects;
  let groupManagerMock: GroupManager;

  beforeEach(() => {
    groupManagerMock = mock(GroupManager);

    TestBed.configureTestingModule({
      providers: [
        GroupEffects,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            [GROUP_FEATURE_KEY]: initialGroupState,
          },
          selectors: [{ selector: selectUser, value: USER_STUB }],
        }),
        providerOf(GroupManager, groupManagerMock),
      ],
    });

    effects = TestBed.inject(GroupEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: GroupActions.init() });
      const expected = hot('-a-|', { a: GroupActions.restore({ groups: null }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
