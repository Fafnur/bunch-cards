import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { WidthModule } from '@bunch/web/ui/theming';

import { CardsTableComponent } from './cards-table.component';

@NgModule({
  imports: [CommonModule, MatTableModule, WidthModule, MatButtonModule, MatIconModule],
  declarations: [CardsTableComponent],
  exports: [CardsTableComponent],
})
export class CardsTableModule {}
