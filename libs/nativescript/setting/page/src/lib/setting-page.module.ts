import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { SettingPageComponent } from './setting-page.component';
import { SettingPageRoutingModule } from './setting-page-routing.module';

@NgModule({
  imports: [NativeScriptCommonModule, SettingPageRoutingModule],
  declarations: [SettingPageComponent],
  exports: [SettingPageComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SettingPageModule {}
