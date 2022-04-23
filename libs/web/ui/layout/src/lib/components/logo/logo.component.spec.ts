import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { mock, when } from 'ts-mockito';

import { EnvironmentService } from '@bunch/core/environments';
import { NavigationPipesModule, PATHS_STUB } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';

import { LogoComponent } from './logo.component';
import { LogoComponentPo } from './logo.component.po';

describe('LogoComponent', () => {
  let pageObject: LogoComponentPo;
  let fixture: ComponentFixture<LogoComponent>;
  let environmentServiceMock: EnvironmentService;
  const BRAND_STUB = 'bunch';

  beforeEach(() => {
    environmentServiceMock = mock(EnvironmentService);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(NavigationPipesModule)],
      declarations: [LogoComponent],
      providers: [PATHS_STUB, providerOf(EnvironmentService, environmentServiceMock)],
    }).compileComponents();
  });

  beforeEach(() => {
    when(environmentServiceMock.getEnvironments()).thenReturn({ brand: BRAND_STUB } as never);

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
    expect(pageObject.image).toBeTruthy();
    expect(pageObject.brand).toBeTruthy();
    expect(pageObject.brandText).toBe(BRAND_STUB);
  });
});
