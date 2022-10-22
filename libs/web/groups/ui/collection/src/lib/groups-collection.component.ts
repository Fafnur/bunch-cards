import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs';

import { DestroyService } from '@bunch/core/utils/destroy';
import { Group } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';

@Component({
  selector: 'bunch-groups-collection',
  templateUrl: './groups-collection.component.html',
  styleUrls: ['./groups-collection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class GroupsCollectionComponent implements OnInit {
  @Input() ordering = false;
  @Input() editing = false;
  @Input() viewing = false;

  groups!: Group[];

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly groupFacade: GroupFacade,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.groupFacade.groups$
      .pipe(
        tap((groups) => {
          this.groups = groups;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onDropped(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.groups, event.previousIndex, event.currentIndex);
  }
}
