import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavigationPipesModule } from '@bunch/core/navigation';

import { GroupCreateComponent } from './group-create.component';

@NgModule({
  imports: [CommonModule, RouterModule, NavigationPipesModule],
  declarations: [GroupCreateComponent],
  exports: [GroupCreateComponent],
})
export class GroupCreateModule {}
