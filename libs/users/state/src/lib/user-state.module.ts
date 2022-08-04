import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffects } from './user.effects';
import { UserFacade } from './user.facade';
import { USER_FEATURE_KEY, userReducer } from './user.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(USER_FEATURE_KEY, userReducer), EffectsModule.forFeature([UserEffects])],
  providers: [UserFacade],
})
export class UserStateModule {}
