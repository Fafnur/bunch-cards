import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { mock, when } from 'ts-mockito';

import { ENVIRONMENTS_DEFAULT, EnvironmentService } from '@bunch/core/environments';
import { NavigationPipesModule, PATHS_STUB } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { IconService } from '@bunch/web/core/icons';

import { LogoComponent } from './logo.component';
import { LogoComponentPo } from './logo.component.po';

describe('LogoComponent', () => {
  let pageObject: LogoComponentPo;
  let fixture: ComponentFixture<LogoComponent>;
  let environmentServiceMock: EnvironmentService;
  let iconServiceMock: IconService;

  beforeEach(async () => {
    environmentServiceMock = mock(EnvironmentService);
    iconServiceMock = mock(IconService);

    when(environmentServiceMock.getEnvironments()).thenReturn(ENVIRONMENTS_DEFAULT);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(NavigationPipesModule), MockModule(MatIconModule)],
      declarations: [LogoComponent],
      providers: [PATHS_STUB, providerOf(IconService, iconServiceMock), providerOf(EnvironmentService, environmentServiceMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    pageObject = new LogoComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.link).toBeTruthy();
    expect(pageObject.icon).toBeTruthy();
    expect(pageObject.brand).toBeTruthy();
    expect(pageObject.brandText).toBe(ENVIRONMENTS_DEFAULT.brand);
  });
});
