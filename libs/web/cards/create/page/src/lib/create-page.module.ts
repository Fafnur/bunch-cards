import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CreateFormModule } from '@bunch/web/cards/create/ui/form';
import { ButtonMediumModule } from '@bunch/web/ui/theming';

import { CreatePageComponent } from './create-page.component';
import { CreatePageRoutingModule } from './create-page-routing.module';

@NgModule({
  imports: [CommonModule, CreatePageRoutingModule, CreateFormModule, ButtonMediumModule],
  declarations: [CreatePageComponent],
})
export class CreatePageModule {}
