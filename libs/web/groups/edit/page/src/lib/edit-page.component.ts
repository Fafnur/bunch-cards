import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs';

import { NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';
import { isNotNullOrUndefined } from '@bunch/core/utils/operators';
import { Group } from '@bunch/groups/common';
import { GroupManager } from '@bunch/groups/manager';

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
    private readonly groupManager: GroupManager,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    const { uuid } = this.route.snapshot.params;
    if (uuid) {
      this.groupManager
        .loadOne(uuid)
        .pipe(isNotNullOrUndefined())
        .pipe(
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
