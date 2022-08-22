import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, verify, when } from 'ts-mockito';

import { AUTH_RESPONSE_STUB, AuthResponse } from '@bunch/auth/common';
import { AuthFacade } from '@bunch/auth/state';
import { NAVIGATION_PATHS, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { SpinnerModule } from '@bunch/web/ui/spinner';

import { EmailConfirmPageComponent } from './email-confirm-page.component';
import { EmailConfirmPageComponentPo } from './email-confirm-page.component.po';

describe('EmailConfirmPageComponent', () => {
  let pageObject: EmailConfirmPageComponentPo;
  let fixture: ComponentFixture<EmailConfirmPageComponent>;
  let navigationServiceMock: NavigationService;
  let authFacadeMock: AuthFacade;
  let activatedRouteMock: ActivatedRoute;
  let confirmEmailSuccess$: ReplaySubject<AuthResponse>;
  let confirmEmailFailure$: ReplaySubject<HttpErrorResponse>;

  beforeEach(async () => {
    navigationServiceMock = mock(NavigationServiceStub);
    authFacadeMock = mock(AuthFacade);
    activatedRouteMock = mock(ActivatedRoute);

    confirmEmailSuccess$ = new ReplaySubject<AuthResponse>(1);
    confirmEmailFailure$ = new ReplaySubject<HttpErrorResponse>(1);

    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);
    when(authFacadeMock.confirmEmailSuccess$).thenReturn(confirmEmailSuccess$);
    when(authFacadeMock.confirmEmailFailure$).thenReturn(confirmEmailFailure$);
    when(activatedRouteMock.snapshot).thenReturn({
      queryParams: {
        token: AUTH_RESPONSE_STUB.accessToken,
      },
    } as never);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(SpinnerModule)],
      declarations: [EmailConfirmPageComponent],
      providers: [
        providerOf(NavigationService, navigationServiceMock),
        providerOf(AuthFacade, authFacadeMock),
        providerOf(ActivatedRoute, activatedRouteMock),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailConfirmPageComponent);
    pageObject = new EmailConfirmPageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.spinner).toBeTruthy();
  });

  it('should redirect to dashboard', () => {
    fixture.detectChanges();

    confirmEmailSuccess$.next(AUTH_RESPONSE_STUB);
    fixture.detectChanges();

    verify(navigationServiceMock.navigateByUrl(NAVIGATION_PATHS.dashboard)).once();
  });
});
