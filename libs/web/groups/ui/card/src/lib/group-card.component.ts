import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs';

import { Card } from '@bunch/cards/common';
import { CardFacade } from '@bunch/cards/state';
import { NavigationPaths, NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';
import { Group } from '@bunch/groups/common';

@Component({
  selector: 'bunch-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class GroupCardComponent implements OnInit {
  @Input() group?: Group;
  @Input() editing = false;
  @Input() viewing = false;

  cards!: Card[];

  paths!: NavigationPaths;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly navigationService: NavigationService,
    private readonly cardFacade: CardFacade,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.paths = this.navigationService.getPaths();
    if (this.group?.uuid) {
      this.cardFacade
        .cardsByGroup$(this.group.uuid)
        .pipe(
          tap((cards) => {
            this.cards = cards;
            this.changeDetectorRef.markForCheck();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    } else {
      this.cards = [];
    }
  }
}
