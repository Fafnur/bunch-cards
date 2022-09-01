import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GroupCreateModule } from '@bunch/web/groups/management/ui/create';
import { GroupsCollectionModule } from '@bunch/web/groups/ui/collection';
import { SpinnerModule } from '@bunch/web/ui/spinner';

import { ManagementPageComponent } from './management-page.component';
import { ManagementPageRoutingModule } from './management-page-routing.module';

@NgModule({
  imports: [CommonModule, ManagementPageRoutingModule, SpinnerModule, GroupsCollectionModule, GroupCreateModule],
  declarations: [ManagementPageComponent],
})
export class ManagementPageModule {}
