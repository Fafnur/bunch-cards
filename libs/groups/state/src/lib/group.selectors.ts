import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GROUP_FEATURE_KEY, groupAdapter, GroupState } from './group.reducer';

export const getGroupState = createFeatureSelector<GroupState>(GROUP_FEATURE_KEY);

const { selectAll, selectEntities } = groupAdapter.getSelectors();

export const getGroupLoaded = createSelector(getGroupState, (state: GroupState) => state.loaded);

export const getGroupError = createSelector(getGroupState, (state: GroupState) => state.error);

export const getAllGroup = createSelector(getGroupState, (state: GroupState) => selectAll(state));

export const getGroupEntities = createSelector(getGroupState, (state: GroupState) => selectEntities(state));

export const getSelectedId = createSelector(getGroupState, (state: GroupState) => state.selectedId);

export const getSelected = createSelector(getGroupEntities, getSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);
