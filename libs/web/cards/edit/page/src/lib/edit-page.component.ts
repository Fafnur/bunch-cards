import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, takeUntil, tap } from 'rxjs';

import { Card } from '@bunch/cards/common';
import { CardFacade } from '@bunch/cards/state';
import { NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';
import { isNotNullOrUndefined } from '@bunch/core/utils/operators';
import { Group } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';

@Component({
  selector: 'bunch-card-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPageComponent implements OnInit {
  group?: Group;
  card?: Card;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly route: ActivatedRoute,
    private readonly cardFacade: CardFacade,
    private readonly groupFacade: GroupFacade,
    private readonly navigationService: NavigationService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    const { uuid } = this.route.snapshot.params;

    if (uuid) {
      this.cardFacade.loadOne(uuid);

      this.cardFacade
        .loadOneSuccess$(uuid)
        .pipe(
          isNotNullOrUndefined(),
          tap((card) => {
            this.card = card;

            this.changeDetectorRef.markForCheck();
          }),
          filter((card) => !!card.groupUuid),
          switchMap((card) => {
            this.groupFacade.loadOne(card.groupUuid);

            return this.groupFacade.loadOneSuccess$(card.groupUuid);
          }),
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
    if (this.group?.uuid) {
      void this.navigationService.navigateByUrl(this.navigationService.getPaths().groupEdit, { uuid: this.group.uuid });
    } else {
      void this.navigationService.navigateByUrl(this.navigationService.getPaths().cardsManagement);
    }
  }
}
