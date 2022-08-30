import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';

import { GroupCardComponent } from './group-card.component';

@NgModule({
  imports: [CommonModule, RouterModule, MatCardModule, MatDividerModule],
  declarations: [GroupCardComponent],
  exports: [GroupCardComponent],
})
export class GroupCardModule {}
