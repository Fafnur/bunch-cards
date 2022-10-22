import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { Card, CARD_STUB } from '@bunch/cards/common';
import { CardFacade } from '@bunch/cards/state';
import { NAVIGATION_PATHS, NavigationPipesModule, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { Group, GROUP_STUB } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';
import { ButtonMediumModule, WidthModule } from '@bunch/web/ui/theming';

import { EditFormComponent } from './edit-form.component';
import { EditFormComponentPo } from './edit-form.component.po';

@Component({
  template: `<bunch-card-edit-form [card]="card" [group]="group"></bunch-card-edit-form>`,
})
class WrapperComponent {
  card = CARD_STUB;
  group = GROUP_STUB;
}

describe('EditFormComponent', () => {
  let po: EditFormComponentPo;
  let fixture: ComponentFixture<WrapperComponent>;
  let activatedRouteMock: ActivatedRoute;
  let groupFacadeMock: GroupFacade;
  let cardFacadeMock: CardFacade;
  let navigationServiceMock: NavigationService;
  let groups$: ReplaySubject<Group[]>;
  let changeFailure$: ReplaySubject<unknown>;
  let changeSuccess$: ReplaySubject<Card>;

  beforeEach(async () => {
    groupFacadeMock = mock(GroupFacade);
    cardFacadeMock = mock(CardFacade);
    navigationServiceMock = mock(NavigationServiceStub);
    activatedRouteMock = mock(ActivatedRoute);

    groups$ = new ReplaySubject<Group[]>(1);
    changeFailure$ = new ReplaySubject<unknown>(1);
    changeSuccess$ = new ReplaySubject<Card>(1);

    when(activatedRouteMock.snapshot).thenReturn({ queryParams: { back: null } } as never);
    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);
    when(groupFacadeMock.groups$).thenReturn(groups$);
    when(cardFacadeMock.changeFailure$).thenReturn(changeFailure$);
    when(cardFacadeMock.changeSuccess$).thenReturn(changeSuccess$);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MockModule(MatFormFieldModule),
        MockModule(MatButtonModule),
        MockModule(MatInputModule),
        MockModule(MatSelectModule),
        MockModule(WidthModule),
        MockModule(ButtonMediumModule),
        MockModule(NavigationPipesModule),
      ],
      declarations: [EditFormComponent, WrapperComponent],
      providers: [
        providerOf(ActivatedRoute, activatedRouteMock),
        providerOf(GroupFacade, groupFacadeMock),
        providerOf(CardFacade, cardFacadeMock),
        providerOf(NavigationService, navigationServiceMock),
      ],
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

    expect(po.form).toBeTruthy();
    expect(po.groupLabel).toBeTruthy();
    expect(po.groupControl).toBeTruthy();
    expect(po.originalLabel).toBeTruthy();
    expect(po.originalControl).toBeTruthy();
    expect(po.translationLabel).toBeTruthy();
    expect(po.translationControl).toBeTruthy();
    expect(po.cancelCards).toBeTruthy();
    expect(po.cancelGroup).toBeFalsy();
    expect(po.save).toBeTruthy();
  });
});
