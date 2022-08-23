import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';

import { ExtractTouchedDirective } from './extract-touched.directive';

@Component({
  template: `<div bunchExtractTouched [control]="control"></div>`,
})
class WrapperComponent {
  control = new UntypedFormControl(null, [Validators.required]);

  @ViewChild(ExtractTouchedDirective) directive!: ExtractTouchedDirective;
}

describe('ExtractTouchedDirective', () => {
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ExtractTouchedDirective, WrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
  });

  it('should create an instance directive', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance.directive).toBeTruthy();
  });

  it('should call markForCheck after control touched', () => {
    fixture.detectChanges();

    const spy = jest.spyOn((fixture.componentInstance.directive as any).changeDetectorRef, 'markForCheck');
    fixture.componentInstance.control.markAsTouched();

    expect(spy).toHaveBeenCalled();
  });
});
