import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as GroupActions from './group.actions';
import * as GroupSelectors from './group.selectors';

@Injectable()
export class GroupFacade {
  loaded$ = this.store.select(GroupSelectors.selectLoaded);

  groups$ = this.store.select(GroupSelectors.selectGroups);

  selectedGroup$ = this.store.select(GroupSelectors.selectSelected);

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(GroupActions.init());
  }
}
