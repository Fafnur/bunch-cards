import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, takeUntil, tap } from 'rxjs';

import { AuthRegister } from '@bunch/auth/common';
import { AuthFacade } from '@bunch/auth/state';
import { NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';
import { Form } from '@bunch/core/utils/types';
import { uuidv4 } from '@bunch/core/utils/uuid';
import { RegisterNotifyService } from '@bunch/web/auth/register/ui/notify';

@Component({
  selector: 'bunch-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class RegisterFormComponent implements OnInit {
  submitted = false;
  error = false;

  readonly form = new FormGroup<Form<AuthRegister>>({
    password: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(6)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    firstname: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    lastname: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    uuid: new FormControl(uuidv4(), { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly authFacade: AuthFacade,
    private readonly navigationService: NavigationService,
    private readonly registerNotifyService: RegisterNotifyService,
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

    this.authFacade.registerFailure$
      .pipe(
        tap(() => {
          this.submitted = false;
          this.error = true;
          this.changeDetectorRef.markForCheck();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.authFacade.registerSuccess$
      .pipe(
        tap(() => {
          this.submitted = false;
          this.changeDetectorRef.markForCheck();
        }),
        switchMap(() => this.registerNotifyService.open(this.form.getRawValue())),
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
      this.authFacade.register(this.form.getRawValue());
    } else {
      // TODO: Scroll to error
    }

    this.changeDetectorRef.markForCheck();
  }
}
