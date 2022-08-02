import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';

import { GroupManager } from '@bunch/groups/manager';

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
        run: () => this.groupManager.load().pipe(map((groups) => GroupActions.loadSuccess({ groups }))),
        onError: (action, error) => GroupActions.loadFailure({ error }),
      })
    );
  });

  loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.loadOne),
      fetch({
        id: ({ uuid }) => `load-${uuid}`,
        run: ({ uuid }) => this.groupManager.loadOne(uuid).pipe(map((group) => GroupActions.loadOneSuccess({ group }))),
        onError: (action, error) => GroupActions.loadOneFailure({ error }),
      })
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.create),
      fetch({
        id: () => 'create',
        run: ({ groupCreate }) => this.groupManager.create(groupCreate).pipe(map((group) => GroupActions.createSuccess({ group }))),
        onError: (action, error) => GroupActions.createFailure({ error }),
      })
    );
  });

  change$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.change),
      fetch({
        id: ({ uuid }) => `change-${uuid}`,
        run: ({ uuid, groupChange }) =>
          this.groupManager.change(uuid, groupChange).pipe(map((group) => GroupActions.changeSuccess({ group }))),
        onError: (action, error) => GroupActions.changeFailure({ error }),
      })
    );
  });

  remove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.remove),
      fetch({
        id: ({ uuid }) => `remove-${uuid}`,
        run: ({ uuid }) => this.groupManager.remove(uuid).pipe(map(() => GroupActions.removeSuccess({ uuid }))),
        onError: (action, error) => GroupActions.removeFailure({ error }),
      })
    );
  });

  constructor(private readonly actions$: Actions, private readonly groupManager: GroupManager) {}

  ngrxOnInitEffects(): Action {
    return GroupActions.init();
  }
}
