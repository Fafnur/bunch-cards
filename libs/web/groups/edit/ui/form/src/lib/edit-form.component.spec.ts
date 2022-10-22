import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { EditFormComponentPo } from './edit-form.component.po';

@Component({
  template: `<bunch-group-edit-form [group]="group"></bunch-group-edit-form>`,
})
class WrapperComponent {
  group = GROUP_STUB;
}

describe('EditFormComponent', () => {
  let po: EditFormComponentPo;
  let fixture: ComponentFixture<WrapperComponent>;
  let groupFacadeMock: GroupFacade;
  let navigationServiceMock: NavigationService;
  let changeFailure$: ReplaySubject<unknown>;
  let changeSuccess$: ReplaySubject<Group>;

  beforeEach(async () => {
    groupFacadeMock = mock(GroupFacade);
    navigationServiceMock = mock(NavigationServiceStub);

    changeFailure$ = new ReplaySubject<unknown>(1);
    changeSuccess$ = new ReplaySubject<Group>(1);

    when(groupFacadeMock.changeFailure$).thenReturn(changeFailure$);
    when(groupFacadeMock.changeSuccess$).thenReturn(changeSuccess$);
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
      declarations: [EditFormComponent, WrapperComponent],
      providers: [providerOf(GroupFacade, groupFacadeMock), providerOf(NavigationService, navigationServiceMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    po = new EditFormComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(po).toBeTruthy();
  });
});
