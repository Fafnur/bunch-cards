import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { providerOf } from '@bunch/core/testing';
import { Group, GROUP_STUB } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';
import { WidthModule } from '@bunch/web/ui/theming';

import { EditFormComponent } from './edit-form.component';

describe('EditFormComponent', () => {
  let component: EditFormComponent;
  let fixture: ComponentFixture<EditFormComponent>;
  let groupFacadeMock: GroupFacade;
  let changeFailure$: ReplaySubject<unknown>;
  let changeSuccess$: ReplaySubject<Group>;

  beforeEach(async () => {
    groupFacadeMock = mock(GroupFacade);

    changeFailure$ = new ReplaySubject<unknown>(1);
    changeSuccess$ = new ReplaySubject<Group>(1);

    when(groupFacadeMock.changeFailure$(GROUP_STUB.uuid)).thenReturn(changeFailure$);
    when(groupFacadeMock.changeSuccess$(GROUP_STUB.uuid)).thenReturn(changeSuccess$);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MockModule(MatButtonModule),
        MockModule(MatInputModule),
        MockModule(WidthModule),
      ],
      declarations: [EditFormComponent],
      providers: [providerOf(GroupFacade, groupFacadeMock)],
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
