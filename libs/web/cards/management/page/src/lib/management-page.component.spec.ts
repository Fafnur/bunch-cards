import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { providerOf } from '@bunch/core/testing';
import { Group, GROUP_STUB } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';
import { CardsTableModule } from '@bunch/web/cards/ui/table';

import { ManagementPageComponent } from './management-page.component';
import { ManagementPageComponentPo } from './management-page.component.po';

describe('ManagementPageComponent', () => {
  let po: ManagementPageComponentPo;
  let fixture: ComponentFixture<ManagementPageComponent>;
  let activatedRouteMock: ActivatedRoute;
  let groupFacadeMock: GroupFacade;
  let group$: ReplaySubject<Group>;

  beforeEach(async () => {
    activatedRouteMock = mock(ActivatedRoute);
    groupFacadeMock = mock(GroupFacade);

    group$ = new ReplaySubject<Group>(1);

    when(activatedRouteMock.snapshot).thenReturn({ params: { uuid: GROUP_STUB.uuid } } as never);
    when(groupFacadeMock.group$(GROUP_STUB.uuid)).thenReturn(group$);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(CardsTableModule)],
      declarations: [ManagementPageComponent],
      providers: [providerOf(ActivatedRoute, activatedRouteMock), providerOf(GroupFacade, groupFacadeMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagementPageComponent);
    po = new ManagementPageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(po.table).toBeTruthy();
  });
});
