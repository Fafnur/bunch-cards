import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';

import { NavigationPipesModule } from '@bunch/core/navigation';
import { WidthModule } from '@bunch/web/ui/theming';

import { EditFormComponent } from './edit-form.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, MatButtonModule, MatInputModule, WidthModule, NavigationPipesModule],
  declarations: [EditFormComponent],
  exports: [EditFormComponent],
})
export class EditFormModule {}
