import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';

import { NavigationPaths, NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';
import { FormFor } from '@bunch/core/utils/types';
import { Group, GroupChange } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';

@Component({
  selector: 'bunch-group-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class EditFormComponent implements OnInit {
  @Input() group!: Group;
  @Output() edited = new EventEmitter<Group>();

  form!: FormGroup<FormFor<GroupChange>>;

  submitted = false;

  paths!: NavigationPaths;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly groupFacade: GroupFacade,
    private readonly navigationService: NavigationService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.paths = this.navigationService.getPaths();

    this.form = new FormGroup<FormFor<GroupChange>>({
      uuid: new FormControl<string>(this.group.uuid, { nonNullable: true, validators: [Validators.required] }),
      name: new FormControl<string>(this.group.name, { nonNullable: true, validators: [Validators.required] }),
      cover: new FormControl<string | null>(this.group.cover),
    });

    this.groupFacade.changeFailure$
      .pipe(
        tap(() => {
          this.submitted = false;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.groupFacade.changeSuccess$
      .pipe(
        tap((group) => {
          this.edited.emit(group);
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
      this.groupFacade.change(this.group.uuid, this.form.getRawValue());
    } else {
      // TODO: Scroll to error
    }

    this.changeDetectorRef.markForCheck();
  }
}
