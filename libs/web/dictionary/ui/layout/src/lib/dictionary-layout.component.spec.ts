import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryLayoutComponent } from './dictionary-layout.component';

describe('DictionaryLayoutComponent', () => {
  let component: DictionaryLayoutComponent;
  let fixture: ComponentFixture<DictionaryLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DictionaryLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DictionaryLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
