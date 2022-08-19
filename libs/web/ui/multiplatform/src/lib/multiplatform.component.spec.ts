import { Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { mock, when } from 'ts-mockito';

import { providerOf } from '@bunch/core/testing';
import { LayoutService } from '@bunch/web/core/layout';

import { MultiplatformComponent } from './multiplatform.component';
import { MultiplatformComponentPo } from './multiplatform.component.po';

@Component({
  template: `<bunch-multiplatform automation-id="multiplatform">
    <div handset automation-id="handset">handset</div>
    <div tablet automation-id="tablet">tablet</div>
    <div web automation-id="web">web</div>
  </bunch-multiplatform>`,
})
class WrapperComponent {}

describe('MultiplatformComponent', () => {
  let pageObject: MultiplatformComponentPo;
  let fixture: ComponentFixture<WrapperComponent>;
  let layoutServiceMock: LayoutService;
  let layoutType$: BehaviorSubject<string>;

  beforeEach(() => {
    layoutServiceMock = mock(LayoutService);

    layoutType$ = new BehaviorSubject<string>(Breakpoints.Handset);
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [MultiplatformComponent, WrapperComponent],
      providers: [providerOf(LayoutService, layoutServiceMock)],
    }).compileComponents();
  });

  beforeEach(() => {
    when(layoutServiceMock.layoutType$).thenReturn(layoutType$);

    fixture = TestBed.createComponent(WrapperComponent);
    pageObject = new MultiplatformComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show handset', () => {
    fixture.detectChanges();

    expect(pageObject.handset).toBeTruthy();
    expect(pageObject.tablet).toBeFalsy();
    expect(pageObject.web).toBeFalsy();
  });

  it('should show tablet', () => {
    layoutType$.next(Breakpoints.Tablet);
    fixture.detectChanges();

    expect(pageObject.handset).toBeFalsy();
    expect(pageObject.tablet).toBeTruthy();
    expect(pageObject.web).toBeFalsy();
  });

  it('should show web', () => {
    layoutType$.next(Breakpoints.Web);
    fixture.detectChanges();

    expect(pageObject.handset).toBeFalsy();
    expect(pageObject.tablet).toBeFalsy();
    expect(pageObject.web).toBeTruthy();
  });
});
