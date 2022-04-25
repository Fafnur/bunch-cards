import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { themer } from '@nativescript-community/ui-material-core';

import { NavModule } from '@bunch/nativescript/ui/nav';

import { LayoutComponent } from './layout.component';

if (__IOS__) {
  themer.setPrimaryColor('#3f51b5');
  themer.setSecondaryColor('#ffc107');
}

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptCommonModule, NavModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LayoutModule {}
