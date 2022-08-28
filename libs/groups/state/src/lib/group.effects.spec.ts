import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { deepEqual, mock, when } from 'ts-mockito';

import { API_ERROR_STUB } from '@bunch/core/api';
import { providerOf } from '@bunch/core/testing';
import { GROUP_CHANGE_STUB, GROUP_CREATE_STUB, GROUP_STUB, GROUPS_STUB } from '@bunch/groups/common';
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

  it('init$ should return restore()', () => {
    actions = hot('a', { a: GroupActions.init() });
    const expected = hot('a', { a: GroupActions.restore({ groups: GROUPS_STUB }) });
    when(groupManagerMock.load()).thenReturn(hot('a', { a: GROUPS_STUB }));

    expect(effects.init$).toBeObservable(expected);
  });

  it('load$ should return loadSuccess()', () => {
    actions = hot('a', { a: GroupActions.load() });
    const expected = hot('a', { a: GroupActions.loadSuccess({ groups: GROUPS_STUB }) });
    when(groupManagerMock.load()).thenReturn(hot('a', { a: GROUPS_STUB }));

    expect(effects.load$).toBeObservable(expected);
  });

  it('load$ should return loadFailure()', () => {
    actions = hot('a', { a: GroupActions.load() });
    const expected = hot('a', { a: GroupActions.loadFailure({ error: API_ERROR_STUB }) });
    when(groupManagerMock.load()).thenReturn(hot('#', null, API_ERROR_STUB));

    expect(effects.load$).toBeObservable(expected);
  });

  it('loadOne$ should return loadOneSuccess()', () => {
    actions = hot('a', { a: GroupActions.loadOne({ uuid: GROUP_STUB.uuid }) });
    const expected = hot('a', { a: GroupActions.loadOneSuccess({ uuid: GROUP_STUB.uuid, group: GROUP_STUB }) });
    when(groupManagerMock.loadOne(GROUP_STUB.uuid)).thenReturn(hot('a', { a: GROUP_STUB }));

    expect(effects.loadOne$).toBeObservable(expected);
  });

  it('loadOne$ should return loadOneFailure()', () => {
    actions = hot('a', { a: GroupActions.loadOne({ uuid: GROUP_STUB.uuid }) });
    const expected = hot('a', { a: GroupActions.loadOneFailure({ uuid: GROUP_STUB.uuid, error: API_ERROR_STUB }) });
    when(groupManagerMock.loadOne(GROUP_STUB.uuid)).thenReturn(hot('#', null, API_ERROR_STUB));

    expect(effects.loadOne$).toBeObservable(expected);
  });

  it('create$ should return createSuccess()', () => {
    actions = hot('a', { a: GroupActions.create({ groupCreate: GROUP_CREATE_STUB }) });
    const expected = hot('a', { a: GroupActions.createSuccess({ group: GROUP_STUB }) });
    when(groupManagerMock.create(deepEqual(GROUP_CREATE_STUB), deepEqual(USER_STUB))).thenReturn(hot('a', { a: GROUP_STUB }));

    expect(effects.create$).toBeObservable(expected);
  });

  it('create$ should return createFailure()', () => {
    actions = hot('a', { a: GroupActions.create({ groupCreate: GROUP_CREATE_STUB }) });
    const expected = hot('a', { a: GroupActions.createFailure({ groupCreate: GROUP_CREATE_STUB, error: API_ERROR_STUB }) });
    when(groupManagerMock.create(deepEqual(GROUP_CREATE_STUB), deepEqual(USER_STUB))).thenReturn(hot('#', null, API_ERROR_STUB));

    expect(effects.create$).toBeObservable(expected);
  });

  it('change$ should return changeSuccess()', () => {
    actions = hot('a', { a: GroupActions.change({ uuid: GROUP_CHANGE_STUB.uuid, groupChange: GROUP_CHANGE_STUB }) });
    const expected = hot('a', { a: GroupActions.changeSuccess({ group: GROUP_STUB }) });
    when(groupManagerMock.change(GROUP_CHANGE_STUB.uuid, deepEqual(GROUP_CHANGE_STUB))).thenReturn(hot('a', { a: GROUP_STUB }));

    expect(effects.change$).toBeObservable(expected);
  });

  it('change$ should return changeFailure()', () => {
    actions = hot('a', { a: GroupActions.change({ uuid: GROUP_CHANGE_STUB.uuid, groupChange: GROUP_CHANGE_STUB }) });
    const expected = hot('a', { a: GroupActions.changeFailure({ uuid: GROUP_CHANGE_STUB.uuid, error: API_ERROR_STUB }) });
    when(groupManagerMock.change(GROUP_CHANGE_STUB.uuid, deepEqual(GROUP_CHANGE_STUB))).thenReturn(hot('#', null, API_ERROR_STUB));

    expect(effects.change$).toBeObservable(expected);
  });

  it('remove$ should return removeSuccess()', () => {
    actions = hot('a', { a: GroupActions.remove({ uuid: GROUP_STUB.uuid }) });
    const expected = hot('a', { a: GroupActions.removeSuccess({ uuid: GROUP_STUB.uuid }) });
    when(groupManagerMock.remove(GROUP_STUB.uuid)).thenReturn(hot('a', { a: undefined }));

    expect(effects.remove$).toBeObservable(expected);
  });

  it('remove$ should return removeFailure()', () => {
    actions = hot('a', { a: GroupActions.remove({ uuid: GROUP_STUB.uuid }) });
    const expected = hot('a', { a: GroupActions.removeFailure({ uuid: GROUP_STUB.uuid, error: API_ERROR_STUB }) });
    when(groupManagerMock.remove(GROUP_STUB.uuid)).thenReturn(hot('#', null, API_ERROR_STUB));

    expect(effects.remove$).toBeObservable(expected);
  });

  it('sync$ should return syncSuccess ()', () => {
    actions = hot('a', { a: GroupActions.sync({ groups: GROUPS_STUB }) });
    const expected = hot('a', { a: GroupActions.syncSuccess({ groups: GROUPS_STUB }) });
    when(groupManagerMock.sync(deepEqual(GROUPS_STUB))).thenReturn(hot('a', { a: GROUPS_STUB }));

    expect(effects.sync$).toBeObservable(expected);
  });

  it('sync$ should return syncFailure()', () => {
    actions = hot('a', { a: GroupActions.sync({ groups: GROUPS_STUB }) });
    const expected = hot('a', { a: GroupActions.syncFailure({ error: API_ERROR_STUB }) });
    when(groupManagerMock.sync(deepEqual(GROUPS_STUB))).thenReturn(hot('#', null, API_ERROR_STUB));

    expect(effects.sync$).toBeObservable(expected);
  });
});
