import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { Card } from '@bunch/cards/common';
import { CardFacade } from '@bunch/cards/state';
import { NAVIGATION_PATHS, NavigationPipesModule, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { GROUP_STUB } from '@bunch/groups/common';

import { GroupCardComponent } from './group-card.component';
import { GroupCardComponentPo } from './group-card.component.po';

@Component({
  template: `<bunch-group-card [group]="group" [editing]="editing" [viewing]="viewing"></bunch-group-card>`,
})
class WrapperComponent {
  group = GROUP_STUB;
  editing = true;
  viewing = true;
}

describe('GroupCardComponent', () => {
  let po: GroupCardComponentPo;
  let fixture: ComponentFixture<WrapperComponent>;
  let navigationServiceMock: NavigationService;
  let cardFacadeMock: CardFacade;
  let cardsByGroup$: ReplaySubject<Card[]>;

  beforeEach(async () => {
    navigationServiceMock = mock(NavigationServiceStub);
    cardFacadeMock = mock(CardFacade);

    cardsByGroup$ = new ReplaySubject<Card[]>(1);

    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);
    when(cardFacadeMock.cardsByGroup$(GROUP_STUB.uuid)).thenReturn(cardsByGroup$);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        MockModule(MatCardModule),
        MockModule(MatDividerModule),
        MockModule(MatIconModule),
        MockModule(MatButtonModule),
        MockModule(NavigationPipesModule),
      ],
      declarations: [GroupCardComponent, WrapperComponent],
      providers: [providerOf(NavigationService, navigationServiceMock), providerOf(CardFacade, cardFacadeMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    po = new GroupCardComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(po).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(po.card).toBeTruthy();
    expect(po.title).toBeTruthy();
    expect(po.subtitle).toBeTruthy();
    expect(po.divider).toBeTruthy();
    expect(po.view).toBeTruthy();
    expect(po.create).toBeTruthy();
    expect(po.editCards).toBeTruthy();
    expect(po.edit).toBeTruthy();
  });
});
