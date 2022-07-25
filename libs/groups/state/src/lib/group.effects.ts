import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';

import { GroupApiService } from '@bunch/groups/api';

import * as GroupActions from './group.actions';

@Injectable()
export class GroupEffects implements OnInitEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.init),
      fetch({
        id: () => 'init',
        run: () => {
          return GroupActions.restore({ groups: null });
        },
      })
    );
  });

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.load),
      fetch({
        id: () => 'load',
        run: () => this.groupApiService.load().pipe(map((groups) => GroupActions.loadSuccess({ groups }))),
        onError: (action, error) => GroupActions.loadFailure({ error }),
      })
    );
  });

  loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.loadOne),
      fetch({
        id: ({ id }) => `load-${id}`,
        run: ({ id }) => this.groupApiService.loadOne(id).pipe(map((group) => GroupActions.loadOneSuccess({ group }))),
        onError: (action, error) => GroupActions.loadOneFailure({ error }),
      })
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.create),
      fetch({
        id: () => 'create',
        run: ({ groupCreate }) => this.groupApiService.create(groupCreate).pipe(map((group) => GroupActions.createSuccess({ group }))),
        onError: (action, error) => GroupActions.createFailure({ error }),
      })
    );
  });

  change$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.change),
      fetch({
        id: ({ id }) => `change-${id}`,
        run: ({ id, groupChange }) =>
          this.groupApiService.change(id, groupChange).pipe(map((group) => GroupActions.changeSuccess({ group }))),
        onError: (action, error) => GroupActions.changeFailure({ error }),
      })
    );
  });

  remove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.remove),
      fetch({
        id: ({ id }) => `remove-${id}`,
        run: ({ id }) => this.groupApiService.remove(id).pipe(map(() => GroupActions.removeSuccess({ id }))),
        onError: (action, error) => GroupActions.removeFailure({ error }),
      })
    );
  });

  constructor(private readonly actions$: Actions, private readonly groupApiService: GroupApiService) {}

  ngrxOnInitEffects(): Action {
    return GroupActions.init();
  }
}
