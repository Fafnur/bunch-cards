import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { mock, when } from 'ts-mockito';

import { NAVIGATION_PATHS, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { CreateFormModule } from '@bunch/web/groups/create/ui/form';

import { CreatePageComponent } from './create-page.component';
import { CreatePageComponentPo } from './create-page.component.po';

describe('CreatePageComponent', () => {
  let po: CreatePageComponentPo;
  let fixture: ComponentFixture<CreatePageComponent>;
  let navigationServiceMock: NavigationService;

  beforeEach(async () => {
    navigationServiceMock = mock(NavigationServiceStub);

    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(CreateFormModule)],
      declarations: [CreatePageComponent],
      providers: [providerOf(NavigationService, navigationServiceMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePageComponent);
    po = new CreatePageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(po.form).toBeTruthy();
  });
});
