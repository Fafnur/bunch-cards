import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormExtractsModule } from '@bunch/core/forms/extract';
import { ButtonMediumModule } from '@bunch/web/ui/theming';

import { LoginPasswordModule } from './components/login-password/login-password.module';
import { LoginUsernameModule } from './components/login-username/login-username.module';
import { RegisterFormComponent } from './register-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginUsernameModule,
    FormExtractsModule,
    LoginPasswordModule,
    MatButtonModule,
    ButtonMediumModule,
    MatFormFieldModule,
  ],
  declarations: [RegisterFormComponent],
  exports: [RegisterFormComponent],
})
export class RegisterFormModule {}
