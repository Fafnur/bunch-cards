import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GroupManagerModule } from '@bunch/groups/manager';

import { GroupEffects } from './group.effects';
import { GroupFacade } from './group.facade';
import { GROUP_FEATURE_KEY, groupReducer } from './group.reducer';

@NgModule({
  imports: [GroupManagerModule, StoreModule.forFeature(GROUP_FEATURE_KEY, groupReducer), EffectsModule.forFeature([GroupEffects])],
  providers: [GroupFacade],
})
export class GroupStateModule {}
