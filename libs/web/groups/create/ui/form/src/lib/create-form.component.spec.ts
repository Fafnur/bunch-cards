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

import { NAVIGATION_PATHS, NavigationPipesModule, NavigationService } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { Group } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';
import { ButtonMediumModule, WidthModule } from '@bunch/web/ui/theming';

import { CreateFormComponent } from './create-form.component';
import { CreateFormComponentPo } from './create-form.component.po';

jest.mock('@bunch/core/utils/uuid', () => ({
  ...jest.requireActual('@bunch/core/utils/uuid'),
  uuidv4: jest.fn().mockReturnValue('uuid'),
}));

describe('CreateFormComponent', () => {
  let po: CreateFormComponentPo;
  let fixture: ComponentFixture<CreateFormComponent>;
  let groupFacadeMock: GroupFacade;
  let createFailure$: ReplaySubject<unknown>;
  let createSuccess$: ReplaySubject<Group>;
  let navigationServiceMock: NavigationService;

  beforeEach(async () => {
    groupFacadeMock = mock(GroupFacade);
    navigationServiceMock = mock(NavigationService);

    createFailure$ = new ReplaySubject<unknown>(1);
    createSuccess$ = new ReplaySubject<Group>(1);

    when(groupFacadeMock.createFailure$).thenReturn(createFailure$);
    when(groupFacadeMock.createSuccess$).thenReturn(createSuccess$);
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
        MockModule(ButtonMediumModule),
        MockModule(NavigationPipesModule),
      ],
      declarations: [CreateFormComponent],
      providers: [providerOf(GroupFacade, groupFacadeMock), providerOf(NavigationService, navigationServiceMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFormComponent);
    po = new CreateFormComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(po.form).toBeTruthy();
    expect(po.nameLabel).toBeTruthy();
    expect(po.nameControl).toBeTruthy();
    expect(po.cancel).toBeTruthy();
    expect(po.create).toBeTruthy();
  });
});
