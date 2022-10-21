import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { NAVIGATION_PATHS, NavigationPipesModule, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { Group, GROUP_STUB } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';
import { WidthModule } from '@bunch/web/ui/theming';

import { EditFormComponent } from './edit-form.component';

describe('EditFormComponent', () => {
  let component: EditFormComponent;
  let fixture: ComponentFixture<EditFormComponent>;
  let groupFacadeMock: GroupFacade;
  let navigationServiceMock: NavigationService;
  let changeFailure$: ReplaySubject<unknown>;
  let changeSuccess$: ReplaySubject<Group>;

  beforeEach(async () => {
    groupFacadeMock = mock(GroupFacade);
    navigationServiceMock = mock(NavigationServiceStub);

    changeFailure$ = new ReplaySubject<unknown>(1);
    changeSuccess$ = new ReplaySubject<Group>(1);

    when(groupFacadeMock.changeOneFailure$(GROUP_STUB.uuid)).thenReturn(changeFailure$);
    when(groupFacadeMock.changeOneSuccess$(GROUP_STUB.uuid)).thenReturn(changeSuccess$);
    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MockModule(MatButtonModule),
        MockModule(MatInputModule),
        MockModule(WidthModule),
        MockModule(NavigationPipesModule),
      ],
      declarations: [EditFormComponent],
      providers: [providerOf(GroupFacade, groupFacadeMock), providerOf(NavigationService, navigationServiceMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFormComponent);
    component = fixture.componentInstance;
    // TODO: Make WrapperComponent
    component.group = GROUP_STUB;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
