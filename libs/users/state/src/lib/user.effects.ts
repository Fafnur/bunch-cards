import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';

import { UserManager } from '@bunch/users/manager';

import * as UserActions from './user.actions';

@Injectable()
export class UserEffects implements OnInitEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.init),
      fetch({
        id: () => 'init',
        run: () => this.userManager.load().pipe(map((user) => UserActions.restore({ user }))),
        onError: (action, error) => console.error(error),
      })
    );
  });

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.load),
      fetch({
        id: () => 'load',
        run: () => this.userManager.load().pipe(map((user) => UserActions.loadSuccess({ user }))),
        onError: (action, error) => UserActions.loadFailure({ error }),
      })
    );
  });

  change$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.change),
      fetch({
        id: () => 'change',
        run: ({ userChange }) => this.userManager.change(userChange).pipe(map((user) => UserActions.changeSuccess({ user }))),
        onError: (action, error) => UserActions.changeFailure({ error }),
      })
    );
  });

  sync$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.sync),
      fetch({
        id: () => 'sync',
        run: ({ user }) => this.userManager.sync(user).pipe(map(() => UserActions.syncSuccess({ user }))),
        onError: (action, error) => UserActions.syncFailure({ error }),
      })
    );
  });

  constructor(private readonly actions$: Actions, private readonly userManager: UserManager) {}

  ngrxOnInitEffects(): Action {
    return UserActions.init();
  }
}
