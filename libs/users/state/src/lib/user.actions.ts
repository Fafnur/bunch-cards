import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { User, UserChange } from '@bunch/users/common';

// Init
export const init = createAction('[User] Init');

export const restore = createAction('[User] Restore', props<{ user: User | null }>());

// Load

export const load = createAction('[User] Load');

export const loadSuccess = createAction('[User] Load Success', props<{ user: User | null }>());

export const loadFailure = createAction('[User] Load Failure', props<{ error: HttpErrorResponse }>());

// Change

export const change = createAction('[User] Change', props<{ userChange: UserChange }>());

export const changeSuccess = createAction('[User] Change Success', props<{ user: User }>());

export const changeFailure = createAction('[User] Change Failure', props<{ error: HttpErrorResponse }>());

// Sync

export const sync = createAction('[User] Sync', props<{ user: User }>());

export const syncSuccess = createAction('[User] Sync Success', props<{ user: User }>());

export const syncFailure = createAction('[User] Sync Failure', props<{ error: unknown }>());
