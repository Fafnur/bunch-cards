import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { mock } from 'ts-mockito';

import { NavigationPipesModule, PATHS_STUB } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { IconService } from '@bunch/web/core/icons';

import { AuthLinksComponent } from './auth-links.component';
import { AuthLinksComponentPo } from './auth-links.component.po';

@Component({
  template: `<bunch-auth-links [mode]="mode"></bunch-auth-links>`,
})
class WrapperComponent {
  mode: 'signin' | 'signup' = 'signin';
}

describe('AuthLinksComponent', () => {
  let pageObject: AuthLinksComponentPo;
  let fixture: ComponentFixture<WrapperComponent>;
  let iconServiceMock: IconService;

  beforeEach(async () => {
    iconServiceMock = mock(IconService);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MockModule(MatButtonModule),
        MockModule(NavigationPipesModule),
        MockModule(MatIconModule),
      ],
      declarations: [AuthLinksComponent, WrapperComponent],
      providers: [PATHS_STUB, providerOf(IconService, iconServiceMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    pageObject = new AuthLinksComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.signin).toBeTruthy();
    expect(pageObject.signup).toBeFalsy();
    expect(pageObject.google).toBeTruthy();
    expect(pageObject.apple).toBeTruthy();
  });

  it('should show sign in', () => {
    pageObject.setMode('signup');
    fixture.detectChanges();

    expect(pageObject.signin).toBeFalsy();
    expect(pageObject.signup).toBeTruthy();
    expect(pageObject.google).toBeTruthy();
    expect(pageObject.apple).toBeTruthy();
  });
});
