import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { AuthFacade } from '@bunch/auth/state';
import { NavigationService } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';

import { SettingsPageComponent } from './settings-page.component';
import { SettingsPageComponentPo } from './settings-page.component.po';

describe('SettingsPageComponent', () => {
  let pageObject: SettingsPageComponentPo;
  let fixture: ComponentFixture<SettingsPageComponent>;
  let authFacadeMock: AuthFacade;
  let navigationServiceMock: NavigationService;
  let logoutSuccess$: ReplaySubject<void>;

  beforeEach(async () => {
    authFacadeMock = mock(AuthFacade);
    navigationServiceMock = mock(NavigationService);
    logoutSuccess$ = new ReplaySubject<void>(1);

    when(authFacadeMock.logoutSuccess$).thenReturn(logoutSuccess$);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [SettingsPageComponent],
      providers: [providerOf(AuthFacade, authFacadeMock), providerOf(NavigationService, navigationServiceMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsPageComponent);
    pageObject = new SettingsPageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.logout).toBeTruthy();
  });
});
