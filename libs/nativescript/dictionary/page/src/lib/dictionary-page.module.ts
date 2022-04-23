import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { DictionaryPageComponent } from './dictionary-page.component';
import { DictionaryPageRoutingModule } from './dictionary-page-routing.module';

@NgModule({
  imports: [NativeScriptCommonModule, DictionaryPageRoutingModule],
  declarations: [DictionaryPageComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DictionaryPageModule {}
