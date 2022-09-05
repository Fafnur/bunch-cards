import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';
import { mock } from 'ts-mockito';

import { GroupFacade } from '@bunch/groups/state';
import { WidthModule } from '@bunch/web/ui/theming';

import { EditFormComponent } from './edit-form.component';
import { providerOf } from '@bunch/core/testing';

describe('EditFormComponent', () => {
  let component: EditFormComponent;
  let fixture: ComponentFixture<EditFormComponent>;
  let groupFacadeMock: GroupFacade;

  beforeEach(async () => {
    groupFacadeMock = mock(GroupFacade);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MockModule(MatButtonModule),
        MockModule(MatInputModule),
        MockModule(WidthModule),
      ],
      declarations: [EditFormComponent],
      providers: [providerOf(GroupFacade, groupFacadeMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(EditFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
