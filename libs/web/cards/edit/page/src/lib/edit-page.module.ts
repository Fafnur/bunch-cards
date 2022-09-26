import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EditFormModule } from '@bunch/web/cards/edit/ui/form';

import { EditPageComponent } from './edit-page.component';
import { EditPageRoutingModule } from './edit-page-routing.module';

@NgModule({
  imports: [CommonModule, EditPageRoutingModule, EditFormModule],
  declarations: [EditPageComponent],
})
export class EditPageModule {}
