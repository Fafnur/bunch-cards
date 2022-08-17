import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { FormExtractsModule } from '@bunch/core/forms/extract';
import { AuthEmailModule, AuthFirstnameModule, AuthLastnameModule, AuthPasswordModule } from '@bunch/web/auth/ui/fields';
import { ButtonMediumModule } from '@bunch/web/ui/theming';

import { RegisterFormComponent } from './register-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormExtractsModule,
    AuthPasswordModule,
    AuthEmailModule,
    AuthLastnameModule,
    AuthFirstnameModule,
    MatButtonModule,
    ButtonMediumModule,
    MatFormFieldModule,
  ],
  declarations: [RegisterFormComponent],
  exports: [RegisterFormComponent],
})
export class RegisterFormModule {}
