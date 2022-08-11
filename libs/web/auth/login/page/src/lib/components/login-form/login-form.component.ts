import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { takeUntil, tap } from 'rxjs';

import { AuthField } from '@bunch/auth/common';
import { AuthFacade } from '@bunch/auth/state';
import { DestroyService } from '@bunch/core/utils/destroy';

@Component({
  selector: 'bunch-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class LoginFormComponent implements OnInit {
  readonly fields = AuthField;

  submitted = false;
  error = false;

  form = new UntypedFormGroup({
    username: new UntypedFormControl(null, [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly authFacade: AuthFacade,
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

    this.authFacade.loginFailure$
      .pipe(
        tap(() => {
          this.error = true;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.authFacade.loginSuccess$
      .pipe(
        tap(() => {
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
      this.authFacade.login(this.form.value);
    } else {
      // TODO: Scroll to error
    }

    this.changeDetectorRef.markForCheck();
  }
}
