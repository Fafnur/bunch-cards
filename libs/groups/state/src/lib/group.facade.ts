import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as GroupActions from './group.actions';
import * as GroupSelectors from './group.selectors';

@Injectable()
export class GroupFacade {
  loaded$ = this.store.select(GroupSelectors.getGroupLoaded);
  allGroup$ = this.store.select(GroupSelectors.getAllGroup);
  selectedGroup$ = this.store.select(GroupSelectors.getSelected);

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(GroupActions.init());
  }
}
