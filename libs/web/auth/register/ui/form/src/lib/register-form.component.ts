import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';

import { AuthField, AuthRegister } from '@bunch/auth/common';
import { AuthFacade } from '@bunch/auth/state';
import { NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';
import { Form } from '@bunch/core/utils/types';

@Component({
  selector: 'bunch-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class RegisterFormComponent implements OnInit {
  readonly fields = AuthField;

  submitted = false;
  error = false;

  readonly form = new FormGroup<Form<AuthRegister>>({
    username: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
  });

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly authFacade: AuthFacade,
    private readonly router: Router,
    private readonly navigationService: NavigationService,
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
          this.submitted = false;
          this.error = true;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.authFacade.loginSuccess$
      .pipe(
        tap(() => {
          this.submitted = false;
          void this.router.navigate(this.navigationService.getRoute(this.navigationService.getPaths().dashboard));
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
      this.authFacade.login(this.form.getRawValue());
    } else {
      // TODO: Scroll to error
    }

    this.changeDetectorRef.markForCheck();
  }
}
