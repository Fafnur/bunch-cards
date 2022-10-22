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
import { NAVIGATION_PATHS, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { AuthEmailModule, AuthPasswordModule } from '@bunch/web/auth/ui/fields';
import { ButtonMediumModule } from '@bunch/web/ui/theming';

import { LoginFormComponent } from './login-form.component';
import { LoginFormComponentPo } from './login-form.component.po';

describe('LoginFormComponent', () => {
  let pageObject: LoginFormComponentPo;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authFacadeMock: AuthFacade;
  let navigationServiceMock: NavigationService;
  let routerMock: Router;

  let loginSuccess$: ReplaySubject<AuthResponse>;
  let loginFailure$: ReplaySubject<HttpErrorResponse>;

  beforeEach(async () => {
    authFacadeMock = mock(AuthFacade);
    navigationServiceMock = mock(NavigationServiceStub);
    routerMock = mock(Router);

    loginSuccess$ = new ReplaySubject<AuthResponse>(1);
    loginFailure$ = new ReplaySubject<HttpErrorResponse>(1);

    when(authFacadeMock.loginSuccess$).thenReturn(loginSuccess$);
    when(authFacadeMock.loginFailure$).thenReturn(loginFailure$);
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
        MockModule(AuthEmailModule),
      ],
      declarations: [LoginFormComponent],
      providers: [
        providerOf(AuthFacade, authFacadeMock),
        providerOf(NavigationService, navigationServiceMock),
        providerOf(Router, routerMock),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    pageObject = new LoginFormComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.form).toBeTruthy();
    expect(pageObject.username).toBeTruthy();
    expect(pageObject.password).toBeTruthy();
    expect(pageObject.error).toBeFalsy();
    expect(pageObject.submit).toBeTruthy();
  });
});
