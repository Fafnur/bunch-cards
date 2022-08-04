import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

import { UserChange } from '@bunch/users/common';

import * as UserActions from './user.actions';
import * as UserSelectors from './user.selectors';

@Injectable()
export class UserFacade {
  user$ = this.store.select(UserSelectors.selectUser);

  loadSuccess$ = this.actions$.pipe(
    ofType(UserActions.loadSuccess),
    map(({ user }) => user)
  );

  loadFailure$ = this.actions$.pipe(
    ofType(UserActions.loadFailure),
    map(({ error }) => error)
  );

  changeSuccess$ = this.actions$.pipe(
    ofType(UserActions.changeSuccess),
    map(({ user }) => user)
  );

  changeFailure$ = this.actions$.pipe(
    ofType(UserActions.changeFailure),
    map(({ error }) => error)
  );

  constructor(private readonly actions$: Actions, private readonly store: Store) {}

  load(): void {
    this.store.dispatch(UserActions.load());
  }

  change(userChange: UserChange): void {
    this.store.dispatch(UserActions.change({ userChange }));
  }
}
