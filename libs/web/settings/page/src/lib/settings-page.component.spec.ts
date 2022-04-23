import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SettingsPageComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  // let pageObject: SettingsPageComponentPo;
  let fixture: ComponentFixture<SettingsPageComponent>;

  // beforeEach(() => {});

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule],
      declarations: [SettingsPageComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsPageComponent);
    // pageObject = new SettingsPageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });
});
