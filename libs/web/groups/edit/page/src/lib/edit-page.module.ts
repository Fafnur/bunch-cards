import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardsTableModule } from '@bunch/web/cards/ui/table';
import { EditFormModule } from '@bunch/web/groups/edit/ui/form';

import { EditPageComponent } from './edit-page.component';
import { EditPageRoutingModule } from './edit-page-routing.module';

@NgModule({
  imports: [CommonModule, EditPageRoutingModule, EditFormModule, CardsTableModule],
  declarations: [EditPageComponent],
  exports: [EditPageComponent],
})
export class EditPageModule {}
