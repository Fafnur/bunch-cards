import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { mock, when } from 'ts-mockito';

import { NAVIGATION_PATHS, NavigationPipesModule, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';

import { GroupCreateComponent } from './group-create.component';
import { GroupCreateComponentPo } from './group-create.component.po';

describe('GroupCreateComponent', () => {
  let po: GroupCreateComponentPo;
  let fixture: ComponentFixture<GroupCreateComponent>;
  let navigationServiceMock: NavigationService;

  beforeEach(async () => {
    navigationServiceMock = mock(NavigationServiceStub);

    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MockModule(NavigationPipesModule),
        MockModule(MatCardModule),
        MockModule(MatIconModule),
        MockModule(MatButtonModule),
      ],
      declarations: [GroupCreateComponent],
      providers: [providerOf(NavigationService, navigationServiceMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(GroupCreateComponent);
    po = new GroupCreateComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(po.card).toBeTruthy();
    expect(po.create).toBeTruthy();
  });
});
