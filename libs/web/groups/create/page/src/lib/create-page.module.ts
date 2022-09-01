import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreatePageComponent } from './create-page.component';
import { CreatePageRoutingModule } from './create-page-routing.module';

@NgModule({
  imports: [CommonModule, CreatePageRoutingModule],
  declarations: [CreatePageComponent],
})
export class CreatePageModule {}
