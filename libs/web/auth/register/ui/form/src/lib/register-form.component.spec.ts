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
import { anything, mock, when } from 'ts-mockito';

import { AuthFacade } from '@bunch/auth/state';
import { FormExtractsModule } from '@bunch/core/forms/extract';
import { NAVIGATION_PATHS, NavigationService } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { RegisterNotifyModule, RegisterNotifyService } from '@bunch/web/auth/register/ui/notify';
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
  let registerNotifyServiceMock: RegisterNotifyService;

  let registerSuccess$: ReplaySubject<void>;
  let registerFailure$: ReplaySubject<HttpErrorResponse>;
  let open$: ReplaySubject<boolean>;

  beforeEach(async () => {
    authFacadeMock = mock(AuthFacade);
    navigationServiceMock = mock(NavigationService);
    routerMock = mock(Router);
    registerNotifyServiceMock = mock(RegisterNotifyService);

    registerSuccess$ = new ReplaySubject<void>(1);
    registerFailure$ = new ReplaySubject<HttpErrorResponse>(1);
    open$ = new ReplaySubject<boolean>(1);

    when(registerNotifyServiceMock.open(anything())).thenReturn(open$);
    when(authFacadeMock.registerSuccess$).thenReturn(registerSuccess$);
    when(authFacadeMock.registerFailure$).thenReturn(registerFailure$);
    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);
    when(navigationServiceMock.getRoute(NAVIGATION_PATHS.dashboard)).thenReturn(['/', NAVIGATION_PATHS.dashboard]);

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
        MockModule(RegisterNotifyModule),
      ],
      declarations: [RegisterFormComponent],
      providers: [
        providerOf(AuthFacade, authFacadeMock),
        providerOf(NavigationService, navigationServiceMock),
        providerOf(Router, routerMock),
        providerOf(RegisterNotifyService, registerNotifyServiceMock),
      ],
    }).compileComponents();

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
