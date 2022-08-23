import { Group, GROUP_STUB, GROUPS_STUB } from '@bunch/groups/common';

import { groupAdapter, GroupState, initialGroupState } from './group.reducer';
import * as GroupSelectors from './group.selectors';

describe('Group Selectors', () => {
  const getState = (data?: Partial<GroupState>, groups: Group[] = []) => groupAdapter.setAll(groups, { ...initialGroupState, ...data });
  let state: GroupState;

  it('selectGroups() should return groups', () => {
    state = getState({}, GROUPS_STUB);
    const results = GroupSelectors.selectGroups.projector(state);

    expect(results.length).toBe(GROUPS_STUB.length);
  });

  // it('getSelected() should return selected', () => {
  //   state = getState({ selectedUuid: GROUP_STUB.uuid }, [GROUP_STUB]);
  //   const result = GroupSelectors.selectSelected.projector(state);
  //
  //   expect(result?.uuid).toBe(GROUP_STUB.uuid);
  // });

  it('getGroupLoaded() should return loaded', () => {
    state = getState({ loaded: true });
    const result = GroupSelectors.selectLoaded.projector(state);

    expect(result).toBeTruthy();
  });

  it('selectSelectedId() should return selectedUuid', () => {
    state = getState({ selectedUuid: GROUP_STUB.uuid });
    const result = GroupSelectors.selectSelectedId.projector(state);

    expect(result).toBe(GROUP_STUB.uuid);
  });
});
