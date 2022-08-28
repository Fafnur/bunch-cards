import { createAction, props } from '@ngrx/store';

import { Card, CardChange, CardCreate } from '@bunch/cards/common';

export const init = createAction('[Card] Init');

export const restore = createAction('[Card] Restore', props<{ cards: Card[] | null }>());

// Load

export const load = createAction('[Card] Load');

export const loadSuccess = createAction('[Card] Load Success', props<{ cards: Card[] }>());

export const loadFailure = createAction('[Card] Load Failure', props<{ error: unknown }>());

// Loan One

export const loadOne = createAction('[Card] Load One', props<{ uuid: string }>());

export const loadOneSuccess = createAction('[Card] Load One Success', props<{ uuid: string; card: Card | null }>());

export const loadOneFailure = createAction('[Card] Load One Failure', props<{ uuid: string; error: unknown }>());

// Create

export const create = createAction('[Card] Create', props<{ cardCreate: CardCreate }>());

export const createSuccess = createAction('[Card] Create Success', props<{ card: Card }>());

export const createFailure = createAction('[Card] Create Failure', props<{ cardCreate: CardCreate; error: unknown }>());

// Change

export const change = createAction('[Card] Change', props<{ uuid: string; cardChange: CardChange }>());

export const changeSuccess = createAction('[Card] Change Success', props<{ card: Card }>());

export const changeFailure = createAction('[Card] Change Failure', props<{ uuid: string; error: unknown }>());

// Remove

export const remove = createAction('[Card] Remove', props<{ uuid: string }>());

export const removeSuccess = createAction('[Card] Remove Success', props<{ uuid: string }>());

export const removeFailure = createAction('[Card] Remove Failure', props<{ uuid: string; error: unknown }>());

// Sync

export const sync = createAction('[Card] Sync', props<{ cards: Card[] }>());

export const syncSuccess = createAction('[Card] Sync Success', props<{ cards: Card[] }>());

export const syncFailure = createAction('[Card] Sync Failure', props<{ error: unknown }>());
