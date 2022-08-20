import { CommonModule } from '@angular/common';
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

import { OauthPageComponent } from './oauth-page.component';
import { OauthPageComponentPo } from './oauth-page.component.po';

describe('OauthPageComponent', () => {
  let pageObject: OauthPageComponentPo;
  let fixture: ComponentFixture<OauthPageComponent>;
  let navigationServiceMock: NavigationService;
  let authFacadeMock: AuthFacade;
  let activatedRouteMock: ActivatedRoute;
  let oauthSuccess$: ReplaySubject<AuthResponse>;

  beforeEach(async () => {
    navigationServiceMock = mock(NavigationServiceStub);
    authFacadeMock = mock(AuthFacade);
    activatedRouteMock = mock(ActivatedRoute);

    oauthSuccess$ = new ReplaySubject<AuthResponse>(1);

    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);
    when(authFacadeMock.oauthSuccess$).thenReturn(oauthSuccess$);
    when(activatedRouteMock.snapshot).thenReturn({
      queryParams: {
        token: AUTH_RESPONSE_STUB.accessToken,
        uuid: AUTH_RESPONSE_STUB.uuid,
      },
    } as never);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(SpinnerModule)],
      declarations: [OauthPageComponent],
      providers: [
        providerOf(NavigationService, navigationServiceMock),
        providerOf(AuthFacade, authFacadeMock),
        providerOf(ActivatedRoute, activatedRouteMock),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OauthPageComponent);
    pageObject = new OauthPageComponentPo(fixture);
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

    oauthSuccess$.next(AUTH_RESPONSE_STUB);
    fixture.detectChanges();

    verify(navigationServiceMock.navigateByUrl(NAVIGATION_PATHS.dashboard)).once();
  });
});
