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
import { Group } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';
import { WidthModule } from '@bunch/web/ui/theming';

import { CreateFormComponent } from './create-form.component';

jest.mock('@bunch/core/utils/uuid', () => ({
  ...jest.requireActual('@bunch/core/utils/uuid'),
  uuidv4: jest.fn().mockReturnValue('uuid'),
}));

/**
 * TODO: Add tests
 */
describe('CreateFormComponent', () => {
  let component: CreateFormComponent;
  let fixture: ComponentFixture<CreateFormComponent>;
  let groupFacadeMock: GroupFacade;
  let createFailure$: ReplaySubject<unknown>;
  let createSuccess$: ReplaySubject<Group>;

  beforeEach(async () => {
    groupFacadeMock = mock(GroupFacade);

    createFailure$ = new ReplaySubject<unknown>(1);
    createSuccess$ = new ReplaySubject<Group>(1);

    when(groupFacadeMock.createFailure$('uuid')).thenReturn(createFailure$);
    when(groupFacadeMock.createSuccess$('uuid')).thenReturn(createSuccess$);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MockModule(MatButtonModule),
        MockModule(MatInputModule),
        MockModule(WidthModule),
      ],
      declarations: [CreateFormComponent],
      providers: [providerOf(GroupFacade, groupFacadeMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
