import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MockModule } from 'ng-mocks';
import { mock, when } from 'ts-mockito';

import { AUTH_RESPONSE_STUB } from '@bunch/auth/common';
import { NAVIGATION_PATHS, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { PasswordChangeFormModule } from '@bunch/web/auth/password-change/ui/form';
import { AuthLinksModule } from '@bunch/web/auth/ui/links';
import { AuthSigninModule } from '@bunch/web/auth/ui/signin';
import { AuthTitleModule } from '@bunch/web/auth/ui/title';

import { PasswordChangePageComponent } from './password-change-page.component';
import { PasswordChangePageComponentPo } from './password-change-page.component.po';

describe('PasswordChangePageComponent', () => {
  let pageObject: PasswordChangePageComponentPo;
  let fixture: ComponentFixture<PasswordChangePageComponent>;
  let activatedRouteMock: ActivatedRoute;
  let navigationServiceMock: NavigationService;

  beforeEach(async () => {
    activatedRouteMock = mock(ActivatedRoute);
    navigationServiceMock = mock(NavigationServiceStub);

    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);
    when(activatedRouteMock.snapshot).thenReturn({
      queryParams: {
        token: AUTH_RESPONSE_STUB.accessToken,
      },
    } as never);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MockModule(PasswordChangeFormModule),
        MockModule(AuthTitleModule),
        MockModule(AuthLinksModule),
        MockModule(AuthSigninModule),
      ],
      declarations: [PasswordChangePageComponent],
      providers: [providerOf(NavigationService, navigationServiceMock), providerOf(ActivatedRoute, activatedRouteMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordChangePageComponent);
    pageObject = new PasswordChangePageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.form).toBeTruthy();
    expect(pageObject.title).toBeTruthy();
    expect(pageObject.signin).toBeTruthy();
    expect(pageObject.links).toBeTruthy();
  });
});
