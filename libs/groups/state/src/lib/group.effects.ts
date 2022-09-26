import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';

import { cardRemoveSuccess } from '@bunch/cards/state';
import { isNotNullOrUndefined } from '@bunch/core/utils/operators';
import { GroupManager } from '@bunch/groups/manager';
import { selectUser } from '@bunch/users/state';

import * as GroupActions from './group.actions';

@Injectable()
export class GroupEffects implements OnInitEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.init),
      fetch({
        id: () => 'init',
        run: () => this.groupManager.load().pipe(map((groups) => GroupActions.restore({ groups }))),
        onError: (action, error) => console.error(error),
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
        run: ({ uuid }) => this.groupManager.loadOne(uuid).pipe(map((group) => GroupActions.loadOneSuccess({ uuid, group }))),
        onError: ({ uuid }, error) => GroupActions.loadOneFailure({ uuid, error }),
      })
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.create),
      concatLatestFrom(() => this.store.select(selectUser).pipe(isNotNullOrUndefined())),
      fetch({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id: (action, user) => 'create',
        run: ({ groupCreate }, user) =>
          this.groupManager.create(groupCreate, user).pipe(map((group) => GroupActions.createSuccess({ group }))),
        onError: ({ groupCreate }, error) => GroupActions.createFailure({ groupCreate, error }),
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
        onError: ({ uuid }, error) => GroupActions.changeFailure({ uuid, error }),
      })
    );
  });

  remove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.remove),
      fetch({
        id: ({ uuid }) => `remove-${uuid}`,
        run: ({ uuid }) => this.groupManager.remove(uuid).pipe(map(() => GroupActions.removeSuccess({ uuid }))),
        onError: ({ uuid }, error) => GroupActions.removeFailure({ uuid, error }),
      })
    );
  });

  sync$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupActions.sync),
      fetch({
        id: () => 'sync',
        run: ({ groups }) =>
          this.groupManager.sync(groups).pipe(map((updatedGroups) => GroupActions.syncSuccess({ groups: updatedGroups }))),
        onError: (action, error) => GroupActions.syncFailure({ error }),
      })
    );
  });

  cardRemoveSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(cardRemoveSuccess),
      fetch({
        id: () => 'card-remove-success',
        run: ({ card }) =>
          this.groupManager.loadOne(card.groupUuid).pipe(
            isNotNullOrUndefined(),
            map((group) =>
              GroupActions.change({
                uuid: group.uuid,
                groupChange: {
                  ...group,
                  cards: group.cards.filter((item) => item !== card.uuid),
                },
              })
            )
          ),
        onError: (action, error) => GroupActions.syncFailure({ error }),
      })
    );
  });

  constructor(private readonly actions$: Actions, private readonly groupManager: GroupManager, private readonly store: Store) {}

  ngrxOnInitEffects(): Action {
    return GroupActions.init();
  }
}
