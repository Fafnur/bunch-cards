import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { GroupEntity } from '@bunch/groups/common';

import * as GroupActions from './group.actions';

export const GROUP_FEATURE_KEY = 'groups';

export interface GroupState extends EntityState<GroupEntity> {
  selectedId?: string | number;
  loaded: boolean;
}

export interface GroupPartialState {
  readonly [GROUP_FEATURE_KEY]: GroupState;
}

export const groupAdapter: EntityAdapter<GroupEntity> = createEntityAdapter<GroupEntity>();

export const initialGroupState: GroupState = groupAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialGroupState,
  on(
    GroupActions.restore,
    (state, { groups }): GroupState =>
      groupAdapter.setAll(groups ?? [], {
        ...state,
        loaded: groups != null,
      })
  ),
  on(
    GroupActions.load,
    (state): GroupState => ({
      ...state,
      loaded: false,
    })
  ),
  on(
    GroupActions.loadSuccess,
    (state, { groups }): GroupState =>
      groupAdapter.setAll(groups, {
        ...state,
        loaded: true,
      })
  ),
  on(
    GroupActions.loadFailure,
    (state): GroupState => ({
      ...state,
      loaded: true,
    })
  ),
  on(GroupActions.loadOneSuccess, (state, { group }): GroupState => (group ? groupAdapter.upsertOne(group, state) : state)),
  on(GroupActions.createSuccess, (state, { group }): GroupState => groupAdapter.addOne(group, state)),
  on(
    GroupActions.changeSuccess,
    (state, { group }): GroupState =>
      groupAdapter.updateOne(
        {
          id: group.id,
          changes: group,
        },
        state
      )
  ),
  on(GroupActions.removeSuccess, (state, { id }): GroupState => groupAdapter.removeOne(id, state))
);

export function groupReducer(state: GroupState | undefined, action: Action): GroupState {
  return reducer(state, action);
}
