import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { AuthResponse } from '@bunch/auth/common';
import { AuthFacade } from '@bunch/auth/state';
import { FormExtractsModule } from '@bunch/core/forms/extract';
import { NAVIGATION_PATHS, NavigationService } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { AuthPasswordConfirmModule, AuthPasswordModule } from '@bunch/web/auth/ui/fields';
import { ButtonMediumModule } from '@bunch/web/ui/theming';

import { PasswordChangeFormComponent } from './password-change-form.component';
import { PasswordChangeFormComponentPo } from './password-change-form.component.po';

describe('PasswordChangeFormComponent', () => {
  let pageObject: PasswordChangeFormComponentPo;
  let fixture: ComponentFixture<PasswordChangeFormComponent>;
  let authFacadeMock: AuthFacade;
  let navigationServiceMock: NavigationService;
  let routerMock: Router;

  let changePasswordSuccess$: ReplaySubject<AuthResponse>;
  let changePasswordFailure$: ReplaySubject<HttpErrorResponse>;

  beforeEach(async () => {
    authFacadeMock = mock(AuthFacade);
    navigationServiceMock = mock(NavigationService);
    routerMock = mock(Router);

    changePasswordSuccess$ = new ReplaySubject<AuthResponse>(1);
    changePasswordFailure$ = new ReplaySubject<HttpErrorResponse>(1);

    when(authFacadeMock.changePasswordSuccess$).thenReturn(changePasswordSuccess$);
    when(authFacadeMock.changePasswordFailure$).thenReturn(changePasswordFailure$);
    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);
    when(navigationServiceMock.getRoute(NAVIGATION_PATHS.dashboard)).thenReturn(['/', NAVIGATION_PATHS.dashboard]);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MockModule(FormExtractsModule),
        MockModule(MatButtonModule),
        MockModule(ButtonMediumModule),
        MockModule(MatFormFieldModule),
        MockModule(AuthPasswordModule),
        MockModule(AuthPasswordConfirmModule),
      ],
      declarations: [PasswordChangeFormComponent],
      providers: [
        providerOf(AuthFacade, authFacadeMock),
        providerOf(NavigationService, navigationServiceMock),
        providerOf(Router, routerMock),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordChangeFormComponent);
    pageObject = new PasswordChangeFormComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.form).toBeTruthy();
    expect(pageObject.password).toBeTruthy();
    expect(pageObject.passwordConfirm).toBeTruthy();
    expect(pageObject.error).toBeFalsy();
    expect(pageObject.submit).toBeTruthy();
  });
});
