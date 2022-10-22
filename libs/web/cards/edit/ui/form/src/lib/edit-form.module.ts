import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';

import { NavigationPipesModule } from '@bunch/core/navigation';
import { ButtonMediumModule, WidthModule } from '@bunch/web/ui/theming';

import { EditFormComponent } from './edit-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    WidthModule,
    ButtonMediumModule,
    NavigationPipesModule,
  ],
  declarations: [EditFormComponent],
  exports: [EditFormComponent],
})
export class EditFormModule {}
