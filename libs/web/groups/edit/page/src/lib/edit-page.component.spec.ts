import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { mock, when } from 'ts-mockito';

import { NAVIGATION_PATHS, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { GroupManager } from '@bunch/groups/manager';
import { EditFormModule } from '@bunch/web/groups/edit/ui/form';

import { EditPageComponent } from './edit-page.component';

describe('EditPageComponent', () => {
  let component: EditPageComponent;
  let fixture: ComponentFixture<EditPageComponent>;
  let navigationServiceMock: NavigationService;
  let groupManagerMock: GroupManager;

  beforeEach(async () => {
    navigationServiceMock = mock(NavigationServiceStub);
    groupManagerMock = mock(GroupManager);

    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(EditFormModule)],
      declarations: [EditPageComponent],
      providers: [providerOf(NavigationService, navigationServiceMock), providerOf(GroupManager, groupManagerMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
