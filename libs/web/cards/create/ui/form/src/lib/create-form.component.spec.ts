import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';
import { mock } from 'ts-mockito';

import { NavigationPipesModule, NavigationService } from '@bunch/core/navigation';
import { providerOf } from '@bunch/core/testing';
import { GroupFacade } from '@bunch/groups/state';
import { ButtonMediumModule, WidthModule } from '@bunch/web/ui/theming';

import { CreateFormComponent } from './create-form.component';
import { CreateFormComponentPo } from './create-form.component.po';

describe('CreateFormComponent', () => {
  let po: CreateFormComponentPo;
  let fixture: ComponentFixture<CreateFormComponent>;
  let groupFacadeMock: GroupFacade;
  let navigationServiceMock: NavigationService;

  beforeEach(async () => {
    groupFacadeMock = mock(GroupFacade);
    navigationServiceMock = mock(NavigationService);

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

    expect(po).toBeTruthy();
  });
});
