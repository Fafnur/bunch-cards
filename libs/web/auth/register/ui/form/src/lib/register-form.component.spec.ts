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
import {
  AuthEmailModule,
  AuthFirstnameModule,
  AuthLastnameModule,
  AuthPasswordModule,
  AuthUsernameModule,
} from '@bunch/web/auth/ui/fields';
import { ButtonMediumModule } from '@bunch/web/ui/theming';

import { RegisterFormComponent } from './register-form.component';
import { RegisterFormComponentPo } from './register-form.component.po';

describe('RegisterFormComponent', () => {
  let pageObject: RegisterFormComponentPo;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let authFacadeMock: AuthFacade;
  let navigationServiceMock: NavigationService;
  let routerMock: Router;

  let registerSuccess$: ReplaySubject<AuthResponse>;
  let registerFailure$: ReplaySubject<HttpErrorResponse>;

  beforeEach(() => {
    authFacadeMock = mock(AuthFacade);
    navigationServiceMock = mock(NavigationService);
    routerMock = mock(Router);

    registerSuccess$ = new ReplaySubject<AuthResponse>(1);
    registerFailure$ = new ReplaySubject<HttpErrorResponse>(1);

    when(authFacadeMock.registerSuccess$).thenReturn(registerSuccess$);
    when(authFacadeMock.registerFailure$).thenReturn(registerFailure$);
    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);
    when(navigationServiceMock.getRoute(NAVIGATION_PATHS.dashboard)).thenReturn(['/', NAVIGATION_PATHS.dashboard]);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MockModule(AuthUsernameModule),
        MockModule(FormExtractsModule),
        MockModule(AuthPasswordModule),
        MockModule(AuthEmailModule),
        MockModule(AuthLastnameModule),
        MockModule(AuthFirstnameModule),
        MockModule(MatButtonModule),
        MockModule(ButtonMediumModule),
        MockModule(MatFormFieldModule),
      ],
      declarations: [RegisterFormComponent],
      providers: [
        providerOf(AuthFacade, authFacadeMock),
        providerOf(NavigationService, navigationServiceMock),
        providerOf(Router, routerMock),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    pageObject = new RegisterFormComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.form).toBeTruthy();
    expect(pageObject.firstname).toBeTruthy();
    expect(pageObject.lastname).toBeTruthy();
    expect(pageObject.email).toBeTruthy();
    expect(pageObject.password).toBeTruthy();
    expect(pageObject.error).toBeFalsy();
    expect(pageObject.submit).toBeTruthy();
  });
});
