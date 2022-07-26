import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { Group, GroupChange, GroupCreate } from '@bunch/groups/common';

export const init = createAction('[Group] Init');

export const restore = createAction('[Group] Restore', props<{ groups: Group[] | null }>());

// Load

export const load = createAction('[Group] Load');

export const loadSuccess = createAction('[Group] Load Success', props<{ groups: Group[] }>());

export const loadFailure = createAction('[Group] Load Failure', props<{ error: HttpErrorResponse }>());

// Loan One

export const loadOne = createAction('[Group] Load One', props<{ uuid: string }>());

export const loadOneSuccess = createAction('[Group] Load One Success', props<{ group: Group | null }>());

export const loadOneFailure = createAction('[Group] Load One Failure', props<{ error: HttpErrorResponse }>());

// Create

export const create = createAction('[Group] Create', props<{ groupCreate: GroupCreate }>());

export const createSuccess = createAction('[Group] Create Success', props<{ group: Group }>());

export const createFailure = createAction('[Group] Create Failure', props<{ error: HttpErrorResponse }>());

// Change

export const change = createAction('[Group] Change', props<{ uuid: string; groupChange: GroupChange }>());

export const changeSuccess = createAction('[Group] Change Success', props<{ group: Group }>());

export const changeFailure = createAction('[Group] Change Failure', props<{ error: HttpErrorResponse }>());

// Remove

export const remove = createAction('[Group] Remove', props<{ uuid: string }>());

export const removeSuccess = createAction('[Group] Remove Success', props<{ uuid: string }>());

export const removeFailure = createAction('[Group] Remove Failure', props<{ error: HttpErrorResponse }>());
