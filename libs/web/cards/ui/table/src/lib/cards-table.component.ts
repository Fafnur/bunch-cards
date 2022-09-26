import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs';

import { Card } from '@bunch/cards/common';
import { CardFacade } from '@bunch/cards/state';
import { DestroyService } from '@bunch/core/utils/destroy';
import { Group } from '@bunch/groups/common';

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

  readonly columns: string[] = ['original', 'translation', 'actions'];

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly cardFacade: CardFacade,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    if (this.group) {
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
      this.cardFacade.cards$
        .pipe(
          tap((cards) => {
            this.cards = cards;
            this.changeDetectorRef.markForCheck();
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();
    }
  }

  onRemove(card: Card): void {
    const groupUuid = card.groupUuid;
    this.cardFacade.remove(card);
  }

  onChange(card: Card): void {
    // const groupUuid = card.groupUuid;
    // this.cardFacade.remove(card.uuid);
  }
}
