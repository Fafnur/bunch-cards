import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinnerModule } from '@bunch/web/ui/spinner';

import { EmailConfirmPageComponent } from './email-confirm-page.component';
import { EmailConfirmPageRoutingModule } from './email-confirm-page-routing.module';

@NgModule({
  imports: [CommonModule, EmailConfirmPageRoutingModule, SpinnerModule],
  declarations: [EmailConfirmPageComponent],
})
export class EmailConfirmPageModule {}
