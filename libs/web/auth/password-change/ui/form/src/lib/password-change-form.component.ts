import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';

import { AuthPasswordChange } from '@bunch/auth/common';
import { AuthFacade } from '@bunch/auth/state';
import { NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';
import { FormFor } from '@bunch/core/utils/types';

export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');

  return password && passwordConfirm && password.value !== passwordConfirm.value ? { passwordInvalid: true } : null;
};

@Component({
  selector: 'bunch-password-change-form',
  templateUrl: './password-change-form.component.html',
  styleUrls: ['./password-change-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class PasswordChangeFormComponent implements OnInit {
  @Input() token!: string;

  submitted = false;
  error = false;

  readonly form = new FormGroup<FormFor<AuthPasswordChange & { passwordConfirm: string }>>(
    {
      password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
      passwordConfirm: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
      token: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    },
    { validators: passwordValidator }
  );

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly authFacade: AuthFacade,
    private readonly navigationService: NavigationService,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    if (this.token) {
      this.form.controls.token.patchValue(this.token);
    }

    this.form.valueChanges
      .pipe(
        tap(() => {
          this.error = false;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.authFacade.changePasswordFailure$
      .pipe(
        tap(() => {
          this.submitted = false;
          this.error = true;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.authFacade.changePasswordSuccess$
      .pipe(
        tap(() => {
          this.submitted = false;
          void this.navigationService.navigateByUrl(this.navigationService.getPaths().dashboard);
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
      this.authFacade.changePassword(this.form.getRawValue());
    } else {
      // TODO: Scroll to error
    }

    this.changeDetectorRef.markForCheck();
  }
}
