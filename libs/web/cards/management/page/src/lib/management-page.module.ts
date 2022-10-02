import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardsTableModule } from '@bunch/web/cards/ui/table';
import { SpinnerModule } from '@bunch/web/ui/spinner';

import { ManagementPageComponent } from './management-page.component';
import { ManagementPageRoutingModule } from './management-page-routing.module';

@NgModule({
  imports: [CommonModule, ManagementPageRoutingModule, SpinnerModule, CardsTableModule],
  declarations: [ManagementPageComponent],
})
export class ManagementPageModule {}
