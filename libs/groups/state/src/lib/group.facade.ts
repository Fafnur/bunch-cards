import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';

import { Group, GroupChange, GroupCreate } from '@bunch/groups/common';

import * as GroupActions from './group.actions';
import * as GroupSelectors from './group.selectors';

@Injectable()
export class GroupFacade {
  loaded$ = this.store.select(GroupSelectors.selectLoaded);

  groups$ = this.store.select(GroupSelectors.selectGroups);
  groupsEntities$ = this.store.select(GroupSelectors.selectGroupEntities);

  loadSuccess$ = this.actions$.pipe(
    ofType(GroupActions.loadSuccess),
    map(({ groups }) => groups)
  );

  loadFailure$ = this.actions$.pipe(
    ofType(GroupActions.loadFailure),
    map(({ error }) => error)
  );

  createSuccess$ = this.actions$.pipe(
    ofType(GroupActions.createSuccess),
    map(({ group }) => group)
  );

  createFailure$ = this.actions$.pipe(
    ofType(GroupActions.createFailure),
    map(({ error }) => error)
  );

  changeSuccess$ = this.actions$.pipe(
    ofType(GroupActions.changeSuccess),
    map(({ group }) => group)
  );

  changeFailure$ = this.actions$.pipe(
    ofType(GroupActions.changeFailure),
    map(({ error }) => error)
  );

  group$ = (uuid: string) => this.store.select(GroupSelectors.selectGroup(uuid));

  loadOneSuccess$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(GroupActions.loadOneSuccess),
      filter((response) => response.uuid === uuid),
      map(({ group }) => group)
    );

  loadOneFailure$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(GroupActions.loadOneFailure),
      filter((response) => response.uuid === uuid),
      map(({ error }) => error)
    );

  removeOneSuccess$ = (uuid: string): Observable<void> =>
    this.actions$.pipe(
      ofType(GroupActions.removeSuccess),
      filter((response) => response.uuid === uuid),
      map(() => undefined)
    );

  removeOneFailure$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(GroupActions.removeFailure),
      filter((response) => response.uuid === uuid),
      map(({ error }) => error)
    );

  createOneSuccess$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(GroupActions.createSuccess),
      filter((response) => response.group.uuid === uuid),
      map(({ group }) => group)
    );

  createOneFailure$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(GroupActions.createFailure),
      filter((response) => response.groupCreate.uuid === uuid),
      map(({ error }) => error)
    );

  changeOneSuccess$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(GroupActions.changeSuccess),
      filter((response) => response.group.uuid === uuid),
      map(({ group }) => group)
    );

  changeOneFailure$ = (uuid: string) =>
    this.actions$.pipe(
      ofType(GroupActions.changeFailure),
      filter((response) => response.uuid === uuid),
      map(({ error }) => error)
    );

  constructor(private readonly actions$: Actions, private readonly store: Store) {}

  load(): void {
    this.store.dispatch(GroupActions.load());
  }

  loadOne(uuid: string): void {
    this.store.dispatch(GroupActions.loadOne({ uuid }));
  }

  create(groupCreate: GroupCreate): void {
    this.store.dispatch(GroupActions.create({ groupCreate }));
  }

  change(uuid: string, groupChange: GroupChange): void {
    this.store.dispatch(GroupActions.change({ groupChange, uuid }));
  }

  remove(uuid: string): void {
    this.store.dispatch(GroupActions.remove({ uuid }));
  }

  sync(groups: Group[]): void {
    this.store.dispatch(GroupActions.sync({ groups }));
  }
}
