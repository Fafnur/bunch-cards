import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthTitleModule } from '@bunch/web/auth/ui/title';

import { RegisterFormModule } from './components/register-form/register-form.module';
import { RegisterPageComponent } from './register-page.component';
import { RegisterPageRoutingModule } from './register-page-routing.module';

@NgModule({
  imports: [CommonModule, RegisterPageRoutingModule, RegisterFormModule, AuthTitleModule],
  declarations: [RegisterPageComponent],
})
export class RegisterPageModule {}
