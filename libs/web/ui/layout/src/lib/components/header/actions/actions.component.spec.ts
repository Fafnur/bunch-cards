import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';

import { ActionsComponent } from './actions.component';
import { ActionsComponentPo } from './actions.component.po';
import { SupportModule } from './components/support/support.module';

describe('ActionsComponent', () => {
  let pageObject: ActionsComponentPo;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MockModule(SupportModule)],
      declarations: [ActionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    pageObject = new ActionsComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.support).toBeTruthy();
  });
});
