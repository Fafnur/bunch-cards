import { GroupEntity } from './group.models';
import { groupAdapter, GroupPartialState, initialGroupState } from './group.reducer';
import * as GroupSelectors from './group.selectors';

describe('Group Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getGroupId = (it: GroupEntity) => it.id;
  const createGroupEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as GroupEntity);

  let state: GroupPartialState;

  beforeEach(() => {
    state = {
      group: groupAdapter.setAll([createGroupEntity('PRODUCT-AAA'), createGroupEntity('PRODUCT-BBB'), createGroupEntity('PRODUCT-CCC')], {
        ...initialGroupState,
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true,
      }),
    };
  });

  describe('Group Selectors', () => {
    it('getAllGroup() should return the list of Group', () => {
      const results = GroupSelectors.getAllGroup(state);
      const selId = getGroupId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = GroupSelectors.getSelected(state) as GroupEntity;
      const selId = getGroupId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getGroupLoaded() should return the current "loaded" status', () => {
      const result = GroupSelectors.getGroupLoaded(state);

      expect(result).toBe(true);
    });

    it('getGroupError() should return the current "error" state', () => {
      const result = GroupSelectors.getGroupError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
