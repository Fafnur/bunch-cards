import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CARD_FEATURE_KEY, cardAdapter, CardState } from './card.reducer';

const selectCardState = createFeatureSelector<CardState>(CARD_FEATURE_KEY);

const { selectAll, selectEntities } = cardAdapter.getSelectors();

export const selectLoaded = createSelector(selectCardState, (state) => state.loaded);

export const selectCards = createSelector(selectCardState, (state) => selectAll(state));

export const selectCardEntities = createSelector(selectCardState, (state) => selectEntities(state));

export const selectCardByUuid = (uuid: string) => createSelector(selectCardEntities, (entities) => entities[uuid] ?? null);

export const selectCardsByGroupUuid = (groupUuid: string) =>
  createSelector(selectCards, (cards) => cards.filter((card) => card.groupUuid === groupUuid));
