import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';

import { Card, CardChange, CardCreate } from '@bunch/cards/common';

import * as CardActions from './card.actions';
import * as CardSelectors from './card.selectors';

@Injectable()
export class CardFacade {
  loaded$ = this.store.select(CardSelectors.selectLoaded);

  cards$ = this.store.select(CardSelectors.selectCards);

  loadSuccess$ = this.actions$.pipe(
    ofType(CardActions.loadSuccess),
    map(({ cards }) => cards)
  );

  loadFailure$ = this.actions$.pipe(
    ofType(CardActions.loadFailure),
    map(({ error }) => error)
  );

  createSuccess$ = this.actions$.pipe(
    ofType(CardActions.createSuccess),
    map(({ card }) => card)
  );

  createFailure$ = this.actions$.pipe(
    ofType(CardActions.createFailure),
    map(({ error }) => error)
  );

  changeSuccess$ = this.actions$.pipe(
    ofType(CardActions.changeSuccess),
    map(({ card }) => card)
  );

  changeFailure$ = this.actions$.pipe(
    ofType(CardActions.changeFailure),
    map(({ error }) => error)
  );

  loadOneSuccess$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(CardActions.loadOneSuccess),
      filter((response) => response.uuid === uuid),
      map(({ card }) => card)
    );

  loadOneFailure$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(CardActions.loadOneFailure),
      filter((response) => response.uuid === uuid),
      map(({ error }) => error)
    );

  removeSuccess$ = (uuid: string): Observable<void> =>
    this.actions$.pipe(
      ofType(CardActions.removeSuccess),
      filter((response) => response.card.uuid === uuid),
      map(() => undefined)
    );

  removeFailure$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(CardActions.removeFailure),
      filter((response) => response.card.uuid === uuid),
      map(({ error }) => error)
    );

  createOneSuccess$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(CardActions.createSuccess),
      filter((response) => response.card.uuid === uuid),
      map(({ card }) => card)
    );

  createOneFailure$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(CardActions.createFailure),
      filter((response) => response.cardCreate.uuid === uuid),
      map(({ error }) => error)
    );

  changeOneSuccess$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(CardActions.changeSuccess),
      filter((response) => response.card.uuid === uuid),
      map(({ card }) => card)
    );

  changeOneFailure$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(CardActions.changeFailure),
      filter((response) => response.uuid === uuid),
      map(({ error }) => error)
    );

  cardsByGroup$ = (uuid: string) => this.store.select(CardSelectors.selectCardsByGroupUuid(uuid));

  constructor(private readonly actions$: Actions, private readonly store: Store) {}

  load(): void {
    this.store.dispatch(CardActions.load());
  }

  loadOne(uuid: string): void {
    this.store.dispatch(CardActions.loadOne({ uuid }));
  }

  create(cardCreate: CardCreate): void {
    this.store.dispatch(CardActions.create({ cardCreate }));
  }

  change(uuid: string, cardChange: CardChange): void {
    this.store.dispatch(CardActions.change({ cardChange, uuid }));
  }

  remove(card: Card): void {
    this.store.dispatch(CardActions.remove({ card }));
  }

  sync(cards: Card[]): void {
    this.store.dispatch(CardActions.sync({ cards }));
  }
}
