import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DictionaryPageComponent } from './dictionary-page.component';
import { DictionaryPageRoutingModule } from './dictionary-page-routing.module';

@NgModule({
  imports: [CommonModule, DictionaryPageRoutingModule],
  declarations: [DictionaryPageComponent],
  exports: [DictionaryPageComponent],
})
export class DictionaryPageModule {}
