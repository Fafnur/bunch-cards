import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CardManagerModule } from '@bunch/cards/manager';

import { CardEffects } from './card.effects';
import { CardFacade } from './card.facade';
import { CARD_FEATURE_KEY, cardReducer } from './card.reducer';

@NgModule({
  imports: [CardManagerModule, StoreModule.forFeature(CARD_FEATURE_KEY, cardReducer), EffectsModule.forFeature([CardEffects])],
  providers: [CardFacade],
})
export class CardsStateModule {}
