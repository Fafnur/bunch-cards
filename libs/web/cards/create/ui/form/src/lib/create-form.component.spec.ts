import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { Card } from '@bunch/cards/common';
import { CardFacade } from '@bunch/cards/state';
import { NAVIGATION_PATHS, NavigationPipesModule, NavigationService, NavigationServiceStub } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { Group } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';
import { ButtonMediumModule, WidthModule } from '@bunch/web/ui/theming';

import { CreateFormComponent } from './create-form.component';
import { CreateFormComponentPo } from './create-form.component.po';

describe('CreateFormComponent', () => {
  let po: CreateFormComponentPo;
  let fixture: ComponentFixture<CreateFormComponent>;
  let groupFacadeMock: GroupFacade;
  let cardFacadeMock: CardFacade;
  let navigationServiceMock: NavigationService;
  let groups$: ReplaySubject<Group[]>;
  let createFailure$: ReplaySubject<unknown>;
  let createSuccess$: ReplaySubject<Card>;

  beforeEach(async () => {
    groupFacadeMock = mock(GroupFacade);
    cardFacadeMock = mock(CardFacade);
    navigationServiceMock = mock(NavigationServiceStub);

    groups$ = new ReplaySubject<Group[]>(1);
    createFailure$ = new ReplaySubject<unknown>(1);
    createSuccess$ = new ReplaySubject<Card>(1);

    when(navigationServiceMock.getPaths()).thenReturn(NAVIGATION_PATHS);
    when(groupFacadeMock.groups$).thenReturn(groups$);
    when(cardFacadeMock.createFailure$).thenReturn(createFailure$);
    when(cardFacadeMock.createSuccess$).thenReturn(createSuccess$);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MockModule(MatButtonModule),
        MockModule(MatInputModule),
        MockModule(WidthModule),
        MockModule(MatSelectModule),
        MockModule(ButtonMediumModule),
        MockModule(NavigationPipesModule),
      ],
      declarations: [CreateFormComponent],
      providers: [
        providerOf(GroupFacade, groupFacadeMock),
        providerOf(CardFacade, cardFacadeMock),
        providerOf(NavigationService, navigationServiceMock),
      ],
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
    expect(po.groupLabel).toBeTruthy();
    expect(po.groupControl).toBeTruthy();
    expect(po.originalLabel).toBeTruthy();
    expect(po.originalControl).toBeTruthy();
    expect(po.translationLabel).toBeTruthy();
    expect(po.translationControl).toBeTruthy();
    expect(po.cancelCards).toBeTruthy();
    expect(po.cancelGroup).toBeFalsy();
    expect(po.create).toBeTruthy();
  });
});
