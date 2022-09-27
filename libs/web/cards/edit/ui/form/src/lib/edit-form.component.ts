import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';

import { Card, CardChange } from '@bunch/cards/common';
import { CardFacade } from '@bunch/cards/state';
import { NavigationPaths, NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';
import { FormFor } from '@bunch/core/utils/types';
import { Group } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';

@Component({
  selector: 'bunch-card-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFormComponent implements OnInit {
  @Input() group?: Group;
  @Input() card!: Card;

  @Output() edited = new EventEmitter<Card>();

  groups!: Group[];

  readonly form = new FormGroup<FormFor<CardChange>>({
    uuid: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    original: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    translation: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    groupUuid: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    cover: new FormControl<string | null>(null),
  });

  submitted = false;

  paths!: NavigationPaths;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly cardFacade: CardFacade,
    private readonly groupFacade: GroupFacade,
    private readonly destroy$: DestroyService,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.paths = this.navigationService.getPaths();

    this.groupFacade.groups$
      .pipe(
        tap((groups) => {
          this.groups = groups;

          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form.patchValue(this.card);

    if (this.group) {
      this.form.patchValue({ groupUuid: this.group.uuid });
      this.form.controls.groupUuid.disable();
    }

    this.cardFacade.changeFailure$
      .pipe(
        tap(() => {
          this.submitted = false;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.cardFacade.changeSuccess$
      .pipe(
        tap((card) => {
          this.edited.emit(card);
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
      this.cardFacade.change(this.card.uuid, this.form.getRawValue());
    } else {
      // TODO: Scroll to error
    }

    this.changeDetectorRef.markForCheck();
  }
}
