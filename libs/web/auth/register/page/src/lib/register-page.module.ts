import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegisterFormModule } from '@bunch/web/auth/register/ui/form';
import { AuthTitleModule } from '@bunch/web/auth/ui/title';

import { RegisterPageComponent } from './register-page.component';
import { RegisterPageRoutingModule } from './register-page-routing.module';

@NgModule({
  imports: [CommonModule, RegisterPageRoutingModule, RegisterFormModule, AuthTitleModule],
  declarations: [RegisterPageComponent],
})
export class RegisterPageModule {}
