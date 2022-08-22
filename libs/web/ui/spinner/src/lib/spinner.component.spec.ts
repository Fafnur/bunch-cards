import { Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { providerOf } from '@bunch/core/testing';
import { LayoutService } from '@bunch/web/core/layout';

import { SpinnerComponent } from './spinner.component';
import { SpinnerComponentPo } from './spinner.component.po';

@Component({
  template: `<bunch-spinner [mobileInvertColor]="mobileInvertColor"></bunch-spinner>`,
})
class WrapperComponent {
  mobileInvertColor = true;
}

/**
 * TODO: Add tests
 */
describe('SpinnerComponent', () => {
  let pageObject: SpinnerComponentPo;
  let fixture: ComponentFixture<WrapperComponent>;
  let layoutServiceMock: LayoutService;
  let layoutType$: BehaviorSubject<string>;

  beforeEach(async () => {
    layoutServiceMock = mock(LayoutService);

    layoutType$ = new BehaviorSubject<string>(Breakpoints.Handset);

    when(layoutServiceMock.layoutType$).thenReturn(layoutType$);

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatProgressSpinnerModule, NoopAnimationsModule],
      declarations: [SpinnerComponent, WrapperComponent],
      providers: [providerOf(LayoutService, layoutServiceMock)],
    }).compileComponents();

    fixture = TestBed.createComponent(WrapperComponent);
    pageObject = new SpinnerComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.spinner).toBeTruthy();
  });
});
