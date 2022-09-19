import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';

import { Card, CardCreate } from '@bunch/cards/common';
import { CardFacade } from '@bunch/cards/state';
import { DestroyService } from '@bunch/core/utils/destroy';
import { FormFor } from '@bunch/core/utils/types';
import { uuidv4 } from '@bunch/core/utils/uuid';
import { Group } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';

@Component({
  selector: 'bunch-card-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class CreateFormComponent implements OnInit {
  @Input() group?: Group;

  @Output() created = new EventEmitter<Card>();

  groups!: Group[];

  readonly form = new FormGroup<FormFor<CardCreate>>({
    uuid: new FormControl<string>(uuidv4(), { nonNullable: true, validators: [Validators.required] }),
    original: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    translation: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    groupUuid: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    cover: new FormControl<string | null>(null),
  });

  submitted = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly cardFacade: CardFacade,
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

    if (this.group) {
      this.form.patchValue({ groupUuid: this.group.uuid });
      this.form.controls.groupUuid.disable();
    }

    this.cardFacade.createFailure$
      .pipe(
        tap(() => {
          this.submitted = false;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.cardFacade.createSuccess$
      .pipe(
        tap((card) => {
          const group = this.group ?? this.groups.find((item) => item.uuid === card.groupUuid);
          if (group) {
            this.groupFacade.change(group.uuid, {
              uuid: group.uuid,
              name: group.name, // TODO: Fix
              cards: [...group.cards, card.uuid],
            });
          }

          this.created.emit(card);
          this.form.reset();
          for (const control of Object.values(this.form.controls)) {
            control.setErrors(null);
          }
          this.form.markAsUntouched();

          this.submitted = false;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid && !this.submitted) {
      this.submitted = true;
      this.cardFacade.create(this.form.getRawValue());
    } else {
      // TODO: Scroll to error
    }

    this.changeDetectorRef.markForCheck();
  }
}
