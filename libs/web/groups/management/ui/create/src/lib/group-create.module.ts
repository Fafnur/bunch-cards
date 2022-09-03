import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { NavigationPipesModule } from '@bunch/core/navigation';

import { GroupCreateComponent } from './group-create.component';

@NgModule({
  imports: [CommonModule, RouterModule, NavigationPipesModule, MatCardModule, MatIconModule, MatButtonModule],
  declarations: [GroupCreateComponent],
  exports: [GroupCreateComponent],
})
export class GroupCreateModule {}
