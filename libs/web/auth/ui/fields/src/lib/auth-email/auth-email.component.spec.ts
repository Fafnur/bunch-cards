import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MockModule } from 'ng-mocks';

import { FormExtractsModule } from '@bunch/core/forms/extract';
import { WidthModule } from '@bunch/web/ui/theming';

import { AuthEmailComponent } from './auth-email.component';
import { AuthEmailComponentPo } from './auth-email.component.po';

@Component({
  template: `<bunch-auth-email [control]="control"></bunch-auth-email>`,
})
class WrapperComponent {
  readonly control = new FormControl<string>('');
}

describe('AuthEmailComponent', () => {
  let pageObject: AuthEmailComponentPo;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MockModule(MatInputModule),
        MockModule(MatFormFieldModule),
        MockModule(WidthModule),
        MockModule(FormExtractsModule),
      ],
      declarations: [AuthEmailComponent, WrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    pageObject = new AuthEmailComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.field).toBeTruthy();
    expect(pageObject.label).toBeTruthy();
    expect(pageObject.control).toBeTruthy();
    expect(pageObject.error).toBeFalsy();
    expect(pageObject.errorRequired).toBeFalsy();
  });
});
