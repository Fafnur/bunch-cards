import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { NAVIGATION_PATHS, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { Group, GROUP_STUB } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';
import { EditFormModule } from '@bunch/web/groups/edit/ui/form';

import { EditPageComponent } from './edit-page.component';
import { EditPageComponentPo } from './edit-page.component.po';

describe('EditPageComponent', () => {
  let po: EditPageComponentPo;
  let fixture: ComponentFixture<EditPageComponent>;
  let navigationServiceMock: NavigationService;
  let activatedRouteMock: ActivatedRoute;
  let groupFacadeMock: GroupFacade;
  let group$: ReplaySubject<Group>;

  beforeEach(async () => {
    activatedRouteMock = mock(ActivatedRoute);
    navigationServiceMock = mock(NavigationServiceStub);
    groupFacadeMock = mock(GroupFacade);

    group$ = new ReplaySubject<Group>(1);

    when(activatedRouteMock.snapshot).thenReturn({ params: { uuid: GROUP_STUB.uuid } } as never);
    when(groupFacadeMock.group$(GROUP_STUB.uuid)).thenReturn(group$);
    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(EditFormModule)],
      declarations: [EditPageComponent],
      providers: [
        providerOf(NavigationService, navigationServiceMock),
        providerOf(GroupFacade, groupFacadeMock),
        providerOf(ActivatedRoute, activatedRouteMock),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPageComponent);
    po = new EditPageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    group$.next(GROUP_STUB);
    fixture.detectChanges();

    expect(po.form).toBeTruthy();
  });
});
