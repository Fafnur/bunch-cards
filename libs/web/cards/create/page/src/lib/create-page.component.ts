import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs';

import { DestroyService } from '@bunch/core/utils/destroy';
import { isNotNullOrUndefined } from '@bunch/core/utils/operators';
import { Group } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';

@Component({
  selector: 'bunch-card-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class CreatePageComponent implements OnInit {
  group?: Group;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly groupFacade: GroupFacade,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    const { uuid } = this.route.snapshot.params;

    if (uuid) {
      this.groupFacade
        .group$(uuid)
        .pipe(
          isNotNullOrUndefined(),
          tap((group) => {
            this.group = group;

            this.changeDetectorRef.markForCheck();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }
}
