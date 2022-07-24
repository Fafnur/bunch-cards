import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import { GroupEntity } from '@bunch/groups/common';

import * as GroupActions from './group.actions';
import { GroupEffects } from './group.effects';
import { GroupFacade } from './group.facade';
import { GROUP_FEATURE_KEY, groupReducer, GroupState, initialGroupState } from './group.reducer';

interface TestSchema {
  group: GroupState;
}

describe('GroupFacade', () => {
  let facade: GroupFacade;
  let store: Store<TestSchema>;
  const createGroupEntity = (id: string, name = ''): any => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(GROUP_FEATURE_KEY, groupReducer), EffectsModule.forFeature([GroupEffects])],
        providers: [GroupFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(GroupFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allGroup$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allGroup$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadGroupSuccess` to manually update list
     */
    it('allGroup$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allGroup$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        GroupActions.loadOneSuccess({
          group: createGroupEntity('AAA'),
        })
      );

      list = await readFirst(facade.allGroup$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
