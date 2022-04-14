import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';

import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptCommonModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LayoutModule {}
