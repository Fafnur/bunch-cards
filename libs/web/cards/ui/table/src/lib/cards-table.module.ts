import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { NavigationPipesModule } from '@bunch/core/navigation';
import { ButtonMediumModule, WidthModule } from '@bunch/web/ui/theming';

import { CardsTableComponent } from './cards-table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    WidthModule,
    MatButtonModule,
    MatIconModule,
    NavigationPipesModule,
    ButtonMediumModule,
  ],
  declarations: [CardsTableComponent],
  exports: [CardsTableComponent],
})
export class CardsTableModule {}
