import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GROUP_FEATURE_KEY, groupAdapter, GroupState } from './group.reducer';

const selectGroupState = createFeatureSelector<GroupState>(GROUP_FEATURE_KEY);

const { selectAll, selectEntities } = groupAdapter.getSelectors();

export const selectLoaded = createSelector(selectGroupState, (state) => state.loaded);

export const selectGroups = createSelector(selectGroupState, (state) => selectAll(state));

export const selectGroupEntities = createSelector(selectGroupState, (state) => selectEntities(state));

export const selectSelectedId = createSelector(selectGroupState, (state) => state.selectedId);

export const selectSelected = createSelector(selectGroupEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : null
);
