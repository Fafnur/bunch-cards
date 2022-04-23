import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardPageComponent } from './dashboard-page.component';
import { DashboardPageRoutingModule } from './dashboard-page-routing.module';

@NgModule({
  imports: [CommonModule, DashboardPageRoutingModule],
  declarations: [DashboardPageComponent],
  exports: [DashboardPageComponent],
})
export class DashboardPageModule {}
