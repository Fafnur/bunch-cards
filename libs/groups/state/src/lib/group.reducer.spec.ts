import { Action } from '@ngrx/store';

import { Group, GROUP_STUB, GROUPS_STUB } from '@bunch/groups/common';

import * as GroupActions from './group.actions';
import { groupAdapter, groupReducer, GroupState, initialGroupState } from './group.reducer';

describe('Group Reducer', () => {
  const getState = (data?: Partial<GroupState>, groups: Group[] = []) => groupAdapter.setAll(groups, { ...initialGroupState, ...data });
  let state: GroupState;

  beforeEach(() => {
    state = getState();
  });

  it('restore() should set groups', () => {
    const action = GroupActions.restore({ groups: GROUPS_STUB });
    const result = groupReducer(state, action);

    expect(result.ids.length).toBe(GROUPS_STUB.length);
  });

  it('loadSuccess() should set groups', () => {
    const action = GroupActions.loadSuccess({ groups: GROUPS_STUB });
    const result = groupReducer(state, action);

    expect(result.ids.length).toBe(GROUPS_STUB.length);
  });

  it('sync() should set groups', () => {
    const action = GroupActions.syncSuccess({ groups: GROUPS_STUB });
    const result = groupReducer(state, action);

    expect(result.ids.length).toBe(GROUPS_STUB.length);
  });

  it('loadFailure() should set loaded', () => {
    const action = GroupActions.loadFailure({ error: '' });
    const result = groupReducer(state, action);

    expect(result.loaded).toBeTruthy();
  });

  it('loadOneSuccess() should add group', () => {
    const action = GroupActions.loadOneSuccess({ group: GROUP_STUB, uuid: GROUP_STUB.uuid });
    const result = groupReducer(state, action);

    expect(result.ids.length).toBe(1);
  });

  it('createSuccess() should add group', () => {
    const action = GroupActions.createSuccess({ group: GROUP_STUB });
    const result = groupReducer(state, action);

    expect(result.ids.length).toBe(1);
  });

  it('changeSuccess() should change group', () => {
    const name = 'name';
    state = getState({}, [GROUP_STUB]);
    const action = GroupActions.changeSuccess({ group: { ...GROUP_STUB, name } });
    const result = groupReducer(state, action);

    expect(result.entities[GROUP_STUB.uuid]?.name).toBe(name);
  });

  it('removeSuccess() should change group', () => {
    state = getState({}, [GROUP_STUB]);
    const action = GroupActions.removeSuccess({ uuid: GROUP_STUB.uuid });
    const result = groupReducer(state, action);

    expect(result.ids.length).toBe(0);
  });

  it('inti() should return the previous state', () => {
    const action = {} as Action;

    const result = groupReducer(initialGroupState, action);

    expect(result).toBe(initialGroupState);
  });
});
