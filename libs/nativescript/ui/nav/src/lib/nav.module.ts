import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { NativeScriptMaterialBottomNavigationBarModule } from '@nativescript-community/ui-material-bottomnavigationbar/angular';

import { NavComponent } from './nav.component';

@NgModule({
  imports: [NativeScriptRouterModule, NativeScriptCommonModule, NativeScriptMaterialBottomNavigationBarModule],
  declarations: [NavComponent],
  exports: [NavComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class NavModule {}
