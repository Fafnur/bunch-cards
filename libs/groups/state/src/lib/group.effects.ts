import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as GroupActions from './group.actions';

@Injectable()
export class GroupEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return GroupActions.loadOneSuccess({ group: null });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return GroupActions.loadOneFailure({ error });
        },
      })
    );
  });

  constructor(private readonly actions$: Actions) {}
}
