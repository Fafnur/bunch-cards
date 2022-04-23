import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';

import { LayoutComponent } from './layout.component';
import { NavModule } from '@bunch/nativescript/ui/nav';

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptCommonModule, NavModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LayoutModule {}
