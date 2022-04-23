import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LearningPageComponent } from './learning-page.component';

describe('LearningPageComponent', () => {
  // let pageObject: LearningPageComponentPo;
  let fixture: ComponentFixture<LearningPageComponent>;

  // beforeEach(() => {});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [LearningPageComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningPageComponent);
    // pageObject = new LearningPageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
