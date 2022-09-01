import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { WidthModule } from '@bunch/web/ui/theming';

import { CreateFormComponent } from './create-form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatInputModule, WidthModule],
  declarations: [CreateFormComponent],
  exports: [CreateFormComponent],
})
export class CreateFormModule {}
