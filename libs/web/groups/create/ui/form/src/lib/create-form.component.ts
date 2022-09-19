import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';

import { DestroyService } from '@bunch/core/utils/destroy';
import { FormFor } from '@bunch/core/utils/types';
import { uuidv4 } from '@bunch/core/utils/uuid';
import { Group, GroupCreate } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';

@Component({
  selector: 'bunch-group-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class CreateFormComponent implements OnInit {
  @Output() created = new EventEmitter<Group>();

  readonly form = new FormGroup<FormFor<GroupCreate>>({
    uuid: new FormControl<string>(uuidv4(), { nonNullable: true, validators: [Validators.required] }),
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    cover: new FormControl<string | null>(null),
  });

  submitted = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly groupFacade: GroupFacade,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.groupFacade
      .createFailure$(this.form.controls.uuid.value)
      .pipe(
        tap(() => {
          this.submitted = false;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.groupFacade
      .createSuccess$(this.form.controls.uuid.value)
      .pipe(
        tap((group) => {
          this.created.emit(group);

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
      this.groupFacade.create(this.form.getRawValue());
    } else {
      // TODO: Scroll to error
    }

    this.changeDetectorRef.markForCheck();
  }
}
