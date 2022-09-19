import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, takeUntil, tap } from 'rxjs';

import { AuthSecrets } from '@bunch/auth/common';
import { AuthFacade } from '@bunch/auth/state';
import { NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';
import { FormFor } from '@bunch/core/utils/types';
import { ResetNotifyService } from '@bunch/web/auth/reset/ui/notify';

@Component({
  selector: 'bunch-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class ResetFormComponent implements OnInit {
  submitted = false;
  error = false;

  readonly form = new FormGroup<FormFor<AuthSecrets>>({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly authFacade: AuthFacade,
    private readonly navigationService: NavigationService,
    private readonly resetNotifyService: ResetNotifyService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        tap(() => {
          this.error = false;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.authFacade.resetFailure$
      .pipe(
        tap(() => {
          this.submitted = false;
          this.error = true;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.authFacade.resetSuccess$
      .pipe(
        tap(() => {
          this.submitted = false;
          this.changeDetectorRef.markForCheck();
        }),
        switchMap(() => this.resetNotifyService.open(this.form.getRawValue())),
        tap(() => {
          void this.navigationService.navigateByUrl(this.navigationService.getPaths().authLogin);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid && !this.submitted) {
      this.submitted = true;
      this.authFacade.reset(this.form.getRawValue());
    } else {
      // TODO: Scroll to error
    }

    this.changeDetectorRef.markForCheck();
  }
}
