import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { NavigationPipesModule } from '@bunch/core/navigation';

import { SupportComponent } from './support.component';

@NgModule({
  imports: [CommonModule, RouterModule, NavigationPipesModule, MatButtonModule, MatIconModule],
  declarations: [SupportComponent],
  exports: [SupportComponent],
})
export class SupportModule {}
