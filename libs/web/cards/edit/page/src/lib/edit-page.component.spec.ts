import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { Card, CARD_STUB } from '@bunch/cards/common';
import { CardFacade } from '@bunch/cards/state';
import { NAVIGATION_PATHS, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { Group, GROUP_STUB } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';
import { EditFormModule } from '@bunch/web/cards/edit/ui/form';

import { EditPageComponent } from './edit-page.component';
import { EditPageComponentPo } from './edit-page.component.po';

describe('EditPageComponent', () => {
  let po: EditPageComponentPo;
  let fixture: ComponentFixture<EditPageComponent>;
  let activatedRouteMock: ActivatedRoute;
  let navigationServiceMock: NavigationService;
  let groupFacadeMock: GroupFacade;
  let cardFacadeMock: CardFacade;
  let group$: ReplaySubject<Group>;
  let card$: ReplaySubject<Card>;

  beforeEach(async () => {
    navigationServiceMock = mock(NavigationServiceStub);
    groupFacadeMock = mock(GroupFacade);
    cardFacadeMock = mock(CardFacade);
    activatedRouteMock = mock(ActivatedRoute);

    group$ = new ReplaySubject<Group>(1);
    card$ = new ReplaySubject<Card>(1);

    when(activatedRouteMock.snapshot).thenReturn({ params: { uuid: CARD_STUB.uuid } } as never);
    when(groupFacadeMock.group$(CARD_STUB.groupUuid)).thenReturn(group$);
    when(cardFacadeMock.card$(CARD_STUB.uuid)).thenReturn(card$);
    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);

    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(EditFormModule)],
      declarations: [EditPageComponent],
      providers: [
        providerOf(GroupFacade, groupFacadeMock),
        providerOf(CardFacade, cardFacadeMock),
        providerOf(ActivatedRoute, activatedRouteMock),
        providerOf(NavigationService, navigationServiceMock),
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
    card$.next(CARD_STUB);
    group$.next(GROUP_STUB);
    fixture.detectChanges();

    expect(po.form).toBeTruthy();
  });
});
