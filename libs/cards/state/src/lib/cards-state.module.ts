import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { GroupManagerModule } from '@bunch/groups/manager';

import { CardEffects } from './card.effects';
import { CardFacade } from './card.facade';
import { CARD_FEATURE_KEY, cardReducer } from './card.reducer';

@NgModule({
  imports: [GroupManagerModule, StoreModule.forFeature(CARD_FEATURE_KEY, cardReducer), EffectsModule.forFeature([CardEffects])],
  providers: [CardFacade],
})
export class CardsStateModule {}
