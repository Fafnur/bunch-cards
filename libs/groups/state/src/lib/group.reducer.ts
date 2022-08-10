import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { GroupEntity } from '@bunch/groups/common';

import * as GroupActions from './group.actions';

export const GROUP_FEATURE_KEY = 'groups';

export interface GroupState extends EntityState<GroupEntity> {
  readonly selectedUuid: string | null;
  readonly loaded: boolean;
}

export interface GroupPartialState {
  readonly [GROUP_FEATURE_KEY]: GroupState;
}

export const groupAdapter = createEntityAdapter<GroupEntity>({
  selectId: (entity) => entity.uuid,
});

export const initialGroupState: GroupState = groupAdapter.getInitialState({
  loaded: false,
  selectedUuid: null,
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
          id: group.uuid,
          changes: group,
        },
        state
      )
  ),
  on(GroupActions.removeSuccess, (state, { uuid }): GroupState => groupAdapter.removeOne(uuid, state))
);

export function groupReducer(state: GroupState | undefined, action: Action): GroupState {
  return reducer(state, action);
}
