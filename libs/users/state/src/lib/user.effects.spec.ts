import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { deepEqual, mock, when } from 'ts-mockito';

import { HTTP_ERROR_STUB } from '@bunch/core/api';
import { providerOf } from '@bunch/core/testing';
import { USER_CHANGE_STUB, USER_STUB } from '@bunch/users/common';
import { UserManager } from '@bunch/users/manager';

import * as UserActions from './user.actions';
import { UserEffects } from './user.effects';
import { initialUserState, USER_FEATURE_KEY } from './user.reducer';

describe('UserEffects', () => {
  let actions: Observable<Action>;
  let effects: UserEffects;
  let userManagerMock: UserManager;

  beforeEach(async () => {
    userManagerMock = mock(UserManager);

    await TestBed.configureTestingModule({
      providers: [
        UserEffects,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: { [USER_FEATURE_KEY]: initialUserState },
        }),
        providerOf(UserManager, userManagerMock),
      ],
    });

    effects = TestBed.inject(UserEffects);
  });

  it('init$ should work', () => {
    actions = hot('a', { a: UserActions.init() });

    // TODO: Fix
    when(userManagerMock.load()).thenReturn(of(USER_STUB));
    const expected = hot('a', { a: UserActions.restore({ user: USER_STUB }) });

    expect(effects.init$).toBeObservable(expected);
  });

  it('load$ should return loadSuccess', () => {
    const action = UserActions.load();
    const completion = UserActions.loadSuccess({ user: USER_STUB });

    actions = hot('a', { a: action });
    const response = hot('a', { a: USER_STUB });
    const expected = hot('a', { a: completion });
    when(userManagerMock.load()).thenReturn(response);

    expect(effects.load$).toBeObservable(expected);
  });

  it('load$ should return loadFailure', () => {
    const action = UserActions.load();
    const completion = UserActions.loadFailure({ error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const response = hot('#', null, HTTP_ERROR_STUB);
    const expected = hot('a', { a: completion });
    when(userManagerMock.load()).thenReturn(response);

    expect(effects.load$).toBeObservable(expected);
  });

  it('change$ should return changeSuccess', () => {
    const action = UserActions.change({ userChange: USER_CHANGE_STUB });
    const completion = UserActions.changeSuccess({ user: USER_STUB });

    actions = hot('a', { a: action });
    const response = hot('a', { a: USER_STUB });
    const expected = hot('a', { a: completion });
    when(userManagerMock.change(deepEqual(USER_CHANGE_STUB))).thenReturn(response);

    expect(effects.change$).toBeObservable(expected);
  });

  it('change$ should return changeFailure', () => {
    const action = UserActions.change({ userChange: USER_CHANGE_STUB });
    const completion = UserActions.changeFailure({ error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const response = hot('#', null, HTTP_ERROR_STUB);
    const expected = hot('a', { a: completion });
    when(userManagerMock.change(deepEqual(USER_CHANGE_STUB))).thenReturn(response);

    expect(effects.change$).toBeObservable(expected);
  });

  it('sync$ should return syncSuccess', () => {
    const action = UserActions.sync({ user: USER_STUB });
    const completion = UserActions.syncSuccess({ user: USER_STUB });

    actions = hot('a', { a: action });
    const response = hot('a', { a: USER_STUB });
    const expected = hot('a', { a: completion });
    when(userManagerMock.sync(deepEqual(USER_STUB))).thenReturn(response);

    expect(effects.sync$).toBeObservable(expected);
  });

  it('sync$ should return syncFailure', () => {
    const action = UserActions.sync({ user: USER_STUB });
    const completion = UserActions.syncFailure({ error: HTTP_ERROR_STUB });

    actions = hot('a', { a: action });
    const response = hot('#', null, HTTP_ERROR_STUB);
    const expected = hot('a', { a: completion });
    when(userManagerMock.sync(deepEqual(USER_STUB))).thenReturn(response);

    expect(effects.sync$).toBeObservable(expected);
  });
});
