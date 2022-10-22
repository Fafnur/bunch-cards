import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardsTableModule } from '@bunch/web/cards/ui/table';

import { ManagementPageComponent } from './management-page.component';
import { ManagementPageRoutingModule } from './management-page-routing.module';

@NgModule({
  imports: [CommonModule, ManagementPageRoutingModule, CardsTableModule],
  declarations: [ManagementPageComponent],
})
export class ManagementPageModule {}
