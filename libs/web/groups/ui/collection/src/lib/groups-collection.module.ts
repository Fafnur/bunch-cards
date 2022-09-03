import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GroupCardModule } from '@bunch/web/groups/ui/card';
import { GridModule } from '@bunch/web/ui/grid';

import { GroupsCollectionComponent } from './groups-collection.component';

@NgModule({
  imports: [CommonModule, GroupCardModule, DragDropModule, GridModule],
  declarations: [GroupsCollectionComponent],
  exports: [GroupsCollectionComponent],
})
export class GroupsCollectionModule {}
