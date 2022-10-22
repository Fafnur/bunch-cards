import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { mock, when } from 'ts-mockito';

import { NAVIGATION_PATHS, NavigationPipesModule, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';

import { DictionaryTabsComponent } from './dictionary-tabs.component';
import { DictionaryTabsComponentPo } from './dictionary-tabs.component.po';

describe('DictionaryTabsComponent', () => {
  let po: DictionaryTabsComponentPo;
  let fixture: ComponentFixture<DictionaryTabsComponent>;
  let navigationServiceMock: NavigationService;

  beforeEach(async () => {
    navigationServiceMock = mock(NavigationServiceStub);

    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, NoopAnimationsModule, MockModule(MatTabsModule), MockModule(NavigationPipesModule)],
      declarations: [DictionaryTabsComponent],
      providers: [providerOf(NavigationService, navigationServiceMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(DictionaryTabsComponent);
    po = new DictionaryTabsComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(po.nav).toBeTruthy();
    expect(po.links.length).toBe(2);
  });
});
