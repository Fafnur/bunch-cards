import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateFormModule } from '@bunch/web/groups/create/ui/form';

import { CreatePageComponent } from './create-page.component';
import { CreatePageRoutingModule } from './create-page-routing.module';

@NgModule({
  imports: [CommonModule, CreatePageRoutingModule, CreateFormModule],
  declarations: [CreatePageComponent],
})
export class CreatePageModule {}
