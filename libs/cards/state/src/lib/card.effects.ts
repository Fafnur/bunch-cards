import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs';

import { CardManager } from '@bunch/cards/manager';
import { isNotNullOrUndefined } from '@bunch/core/utils/operators';
import { selectUser } from '@bunch/users/state';

import * as CardActions from './card.actions';

@Injectable()
export class CardEffects implements OnInitEffects {
  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.init),
      fetch({
        id: () => 'init',
        run: () => this.cardManager.load().pipe(map((cards) => CardActions.restore({ cards }))),
        onError: (action, error) => console.error(error),
      })
    );
  });

  load$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.load),
      fetch({
        id: () => 'load',
        run: () => this.cardManager.load().pipe(map((cards) => CardActions.loadSuccess({ cards }))),
        onError: (action, error) => CardActions.loadFailure({ error }),
      })
    );
  });

  loadOne$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.loadOne),
      fetch({
        id: ({ uuid }) => `load-${uuid}`,
        run: ({ uuid }) => this.cardManager.loadOne(uuid).pipe(map((card) => CardActions.loadOneSuccess({ uuid, card }))),
        onError: ({ uuid }, error) => CardActions.loadOneFailure({ uuid, error }),
      })
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.create),
      concatLatestFrom(() => this.store.select(selectUser).pipe(isNotNullOrUndefined())),
      fetch({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id: (action, user) => 'create',
        run: ({ cardCreate }, user) => this.cardManager.create(cardCreate, user).pipe(map((card) => CardActions.createSuccess({ card }))),
        onError: ({ cardCreate }, error) => CardActions.createFailure({ cardCreate, error }),
      })
    );
  });

  change$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.change),
      fetch({
        id: ({ uuid }) => `change-${uuid}`,
        run: ({ uuid, cardChange }) => this.cardManager.change(uuid, cardChange).pipe(map((card) => CardActions.changeSuccess({ card }))),
        onError: ({ uuid }, error) => CardActions.changeFailure({ uuid, error }),
      })
    );
  });

  remove$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.remove),
      fetch({
        id: ({ card }) => `remove-${card.uuid}`,
        run: ({ card }) => this.cardManager.remove(card.uuid).pipe(map(() => CardActions.removeSuccess({ card }))),
        onError: ({ card }, error) => CardActions.removeFailure({ card, error }),
      })
    );
  });

  sync$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CardActions.sync),
      fetch({
        id: () => 'sync',
        run: ({ cards }) => this.cardManager.sync(cards).pipe(map((updatedCards) => CardActions.syncSuccess({ cards: updatedCards }))),
        onError: (action, error) => CardActions.syncFailure({ error }),
      })
    );
  });

  constructor(private readonly actions$: Actions, private readonly cardManager: CardManager, private readonly store: Store) {}

  ngrxOnInitEffects(): Action {
    return CardActions.init();
  }
}
