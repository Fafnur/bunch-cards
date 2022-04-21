import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { DashboardPageComponent } from './dashboard-page.component';
import { DashboardPageRoutingModule } from './dashboard-page-routing.module';

@NgModule({
  imports: [NativeScriptCommonModule, DashboardPageRoutingModule],
  declarations: [DashboardPageComponent],
  exports: [DashboardPageComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class DashboardPageModule {}
