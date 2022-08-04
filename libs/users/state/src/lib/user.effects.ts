import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
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
      concatLatestFrom(() => this.userManager.load()),
      fetch({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id: (action, user) => 'init',
        run: (action, user) => UserActions.restore({ user }),
        onError: (action, error) => console.error('Error', error),
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
        id: () => 'load',
        run: ({ userChange }) => this.userManager.change(userChange).pipe(map((user) => UserActions.changeSuccess({ user }))),
        onError: (action, error) => UserActions.changeFailure({ error }),
      })
    );
  });

  constructor(private readonly actions$: Actions, private readonly userManager: UserManager) {}

  ngrxOnInitEffects(): Action {
    return UserActions.init();
  }
}
