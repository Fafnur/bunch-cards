import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinnerModule } from '@bunch/web/ui/spinner';

import { ManagementPageComponent } from './management-page.component';
import { ManagementPageRoutingModule } from './management-page-routing.module';

@NgModule({
  imports: [CommonModule, ManagementPageRoutingModule, SpinnerModule],
  declarations: [ManagementPageComponent],
})
export class ManagementPageModule {}
