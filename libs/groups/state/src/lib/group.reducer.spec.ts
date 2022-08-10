import { Action } from '@ngrx/store';

import * as GroupActions from './group.actions';
import { groupReducer, GroupState, initialGroupState } from './group.reducer';

describe('Group Reducer', () => {
  const createGroupEntity = (id: string, name = ''): any => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Group actions', () => {
    it('loadGroupSuccess should return the list of known Group', () => {
      const group = [createGroupEntity('PRODUCT-AAA'), createGroupEntity('PRODUCT-zzz')];
      const action = GroupActions.loadOneSuccess({ group: null });

      const result: GroupState = groupReducer(initialGroupState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = groupReducer(initialGroupState, action);

      expect(result).toBe(initialGroupState);
    });
  });
});
