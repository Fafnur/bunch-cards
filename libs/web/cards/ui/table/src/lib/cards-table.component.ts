import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { takeUntil, tap } from 'rxjs';

import { Card } from '@bunch/cards/common';
import { CardFacade } from '@bunch/cards/state';
import { NavigationPaths, NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';
import { Group } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';

@Component({
  selector: 'bunch-cards-table',
  templateUrl: './cards-table.component.html',
  styleUrls: ['./cards-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class CardsTableComponent implements OnInit {
  @Input() group?: Group;

  cards!: Card[];
  groups!: Dictionary<Group>;

  paths!: NavigationPaths;

  readonly columns: string[] = ['groupName', 'original', 'translation', 'actions'];

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly cardFacade: CardFacade,
    private readonly groupFacade: GroupFacade,
    private readonly navigationService: NavigationService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.paths = this.navigationService.getPaths();

    this.groupFacade.groupsEntities$
      .pipe(
        tap((groups) => {
          this.groups = groups;

          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    if (this.group) {
      this.cardFacade
        .cardsByGroup$(this.group.uuid)
        .pipe(
          tap((cards) => {
            this.cards = cards;
            this.cards.sort((a, b) => (a.groupUuid < b.groupUuid ? 1 : -1));

            this.changeDetectorRef.markForCheck();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    } else {
      this.cardFacade.cards$
        .pipe(
          tap((cards) => {
            this.cards = cards;
            this.cards.sort((a, b) => (a.groupUuid < b.groupUuid ? 1 : -1));
            this.changeDetectorRef.markForCheck();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  onRemove(card: Card): void {
    this.cardFacade.remove(card);
  }

  onChange(card: Card): void {
    // const groupUuid = card.groupUuid;
    // this.cardFacade.remove(card.uuid);
  }
}
