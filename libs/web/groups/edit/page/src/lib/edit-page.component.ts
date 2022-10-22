import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs';

import { NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';
import { isNotNullOrUndefined } from '@bunch/core/utils/operators';
import { Group } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';

@Component({
  selector: 'bunch-group-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class EditPageComponent implements OnInit {
  group?: Group;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
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
    } else {
      this.navigate();
    }
  }

  onEdited(): void {
    this.navigate();
  }

  private navigate(): void {
    void this.navigationService.navigateByUrl(this.navigationService.getPaths().groupsManagement);
  }
}
