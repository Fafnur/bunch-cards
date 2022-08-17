import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormExtractsModule } from '@bunch/core/forms/extract';
import { AuthEmailModule, AuthPasswordModule } from '@bunch/web/auth/ui/fields';
import { ButtonMediumModule } from '@bunch/web/ui/theming';

import { LoginFormComponent } from './login-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormExtractsModule,
    MatButtonModule,
    ButtonMediumModule,
    MatFormFieldModule,
    AuthEmailModule,
    AuthPasswordModule,
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent],
})
export class LoginFormModule {}
