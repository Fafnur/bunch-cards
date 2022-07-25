import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GroupApiModule } from '@bunch/groups/api';

import { GroupEffects } from './group.effects';
import { GroupFacade } from './group.facade';
import { GROUP_FEATURE_KEY, groupReducer } from './group.reducer';

@NgModule({
  imports: [GroupApiModule, StoreModule.forFeature(GROUP_FEATURE_KEY, groupReducer), EffectsModule.forFeature([GroupEffects])],
  providers: [GroupFacade],
})
export class GroupStateModule {}
