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
import { CreateFormModule } from '@bunch/web/cards/create/ui/form';

import { CreatePageComponent } from './create-page.component';
import { CreatePageComponentPo } from './create-page.component.po';

describe('CreatePageComponent', () => {
  let po: CreatePageComponentPo;
  let fixture: ComponentFixture<CreatePageComponent>;
  let activatedRouteMock: ActivatedRoute;
  let groupFacadeMock: GroupFacade;
  let group$: ReplaySubject<Group>;

  beforeEach(async () => {
    groupFacadeMock = mock(GroupFacade);
    activatedRouteMock = mock(ActivatedRoute);

    group$ = new ReplaySubject<Group>(1);

    when(activatedRouteMock.snapshot).thenReturn({ params: { uuid: GROUP_STUB.uuid } } as never);
    when(groupFacadeMock.group$(GROUP_STUB.uuid)).thenReturn(group$);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(CreateFormModule)],
      declarations: [CreatePageComponent],
      providers: [providerOf(GroupFacade, groupFacadeMock), providerOf(ActivatedRoute, activatedRouteMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePageComponent);
    po = new CreatePageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(po.form).toBeTruthy();
  });
});
