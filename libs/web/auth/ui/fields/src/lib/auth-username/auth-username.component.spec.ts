import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MockModule } from 'ng-mocks';

import { FormExtractsModule } from '@bunch/core/forms/extract';
import { WidthModule } from '@bunch/web/ui/theming';

import { AuthUsernameComponent } from './auth-username.component';
import { AuthUsernameComponentPo } from './auth-username.component.po';

@Component({
  template: `<bunch-auth-username [control]="control"></bunch-auth-username>`,
})
class WrapperComponent {
  readonly control = new FormControl<string>('');
}

describe('LoginUsernameComponent', () => {
  let pageObject: AuthUsernameComponentPo;
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
      declarations: [AuthUsernameComponent, WrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    pageObject = new AuthUsernameComponentPo(fixture);
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
  });
});
