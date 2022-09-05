import { NgModule } from '@angular/core';

import { GroupEditGuard } from './group-edit.guard';

@NgModule({
  providers: [GroupEditGuard],
})
export class GroupsGuardsModule {}
