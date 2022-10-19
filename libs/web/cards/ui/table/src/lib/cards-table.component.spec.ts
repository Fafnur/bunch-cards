import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { Card, CARDS_STUB } from '@bunch/cards/common';
import { CardFacade } from '@bunch/cards/state';
import { NAVIGATION_PATHS, NavigationPipesModule, NavigationService } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { Group, GROUP_STUB, GROUPS_ENTITIES_STUB } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';
import { ButtonMediumModule, WidthModule } from '@bunch/web/ui/theming';

import { CardsTableComponent } from './cards-table.component';
import { CardsFormComponentPo } from './cards-table.component.po';

@Component({
  template: `<bunch-cards-table [group]="group"></bunch-cards-table>`,
})
class WrapperComponent {
  group = GROUP_STUB;
}

/**
 * TODO: Add tests
 */
describe('CardsTableComponent', () => {
  let po: CardsFormComponentPo;
  let fixture: ComponentFixture<WrapperComponent>;
  let cardFacadeMock: CardFacade;
  let groupFacadeMock: GroupFacade;
  let navigationServiceMock: NavigationService;
  let groupsEntities$: ReplaySubject<Record<string, Group>>;
  let cardsByGroup$: ReplaySubject<Card[]>;
  let cards$: ReplaySubject<Card[]>;

  beforeEach(async () => {
    cardFacadeMock = mock(CardFacade);
    groupFacadeMock = mock(GroupFacade);
    navigationServiceMock = mock(NavigationService);

    groupsEntities$ = new ReplaySubject<Record<string, Group>>(1);
    cardsByGroup$ = new ReplaySubject<Card[]>(1);
    cards$ = new ReplaySubject<Card[]>(1);

    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);
    when(groupFacadeMock.groupsEntities$).thenReturn(groupsEntities$);
    when(cardFacadeMock.cardsByGroup$(GROUP_STUB.uuid)).thenReturn(cardsByGroup$);
    when(cardFacadeMock.cards$).thenReturn(cards$);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MockModule(MatTableModule),
        MockModule(MatButtonModule),
        MockModule(MatIconModule),
        MockModule(NavigationPipesModule),
        MockModule(WidthModule),
        MockModule(ButtonMediumModule),
      ],
      declarations: [CardsTableComponent, WrapperComponent],
      providers: [
        providerOf(CardFacade, cardFacadeMock),
        providerOf(GroupFacade, groupFacadeMock),
        providerOf(NavigationService, navigationServiceMock),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    po = new CardsFormComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    groupsEntities$.next(GROUPS_ENTITIES_STUB);
    cardsByGroup$.next(CARDS_STUB);
    cards$.next(CARDS_STUB);

    fixture.detectChanges();

    expect(po.table).toBeTruthy();
    // expect(po.groupHeader).toBeTruthy();
    // expect(po.group.length).toBe(1);
    // expect(po.actionsHeader).toBeTruthy();
    // expect(po.actions.length).toBe(1);
    // expect(po.translationHeader).toBeTruthy();
    // expect(po.translation.length).toBe(1);
    // expect(po.originalHeader).toBeTruthy();
    // expect(po.original.length).toBe(1);
  });
});
