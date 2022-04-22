import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DictionaryPageComponent } from './dictionary-page.component';

describe('DictionaryPageComponent', () => {
  // let pageObject: DictionaryPageComponentPo;
  let fixture: ComponentFixture<DictionaryPageComponent>;

  // beforeEach(() => {});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [DictionaryPageComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryPageComponent);
    // pageObject = new DictionaryPageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
