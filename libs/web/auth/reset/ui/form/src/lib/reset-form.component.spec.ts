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
import { ResetNotifyModule, ResetNotifyService } from '@bunch/web/auth/reset/ui/notify';
import { AuthEmailModule, AuthPasswordModule } from '@bunch/web/auth/ui/fields';
import { ButtonMediumModule } from '@bunch/web/ui/theming';

import { ResetFormComponent } from './reset-form.component';
import { ResetFormComponentPo } from './reset-form.component.po';

describe('ResetFormComponent', () => {
  let pageObject: ResetFormComponentPo;
  let fixture: ComponentFixture<ResetFormComponent>;
  let authFacadeMock: AuthFacade;
  let navigationServiceMock: NavigationService;
  let routerMock: Router;
  let resetNotifyServiceMock: ResetNotifyService;

  let resetSuccess$: ReplaySubject<void>;
  let resetFailure$: ReplaySubject<HttpErrorResponse>;
  let open$: ReplaySubject<boolean>;

  beforeEach(async () => {
    authFacadeMock = mock(AuthFacade);
    navigationServiceMock = mock(NavigationService);
    routerMock = mock(Router);
    resetNotifyServiceMock = mock(ResetNotifyService);

    resetSuccess$ = new ReplaySubject<void>(1);
    resetFailure$ = new ReplaySubject<HttpErrorResponse>(1);
    open$ = new ReplaySubject<boolean>(1);

    when(resetNotifyServiceMock.open(anything())).thenReturn(open$);
    when(authFacadeMock.resetSuccess$).thenReturn(resetSuccess$);
    when(authFacadeMock.resetFailure$).thenReturn(resetFailure$);
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
        MockModule(ResetNotifyModule),
      ],
      declarations: [ResetFormComponent],
      providers: [
        providerOf(AuthFacade, authFacadeMock),
        providerOf(NavigationService, navigationServiceMock),
        providerOf(Router, routerMock),
        providerOf(ResetNotifyService, resetNotifyServiceMock),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetFormComponent);
    pageObject = new ResetFormComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.form).toBeTruthy();
    expect(pageObject.email).toBeTruthy();
    expect(pageObject.error).toBeFalsy();
    expect(pageObject.submit).toBeTruthy();
  });
});
