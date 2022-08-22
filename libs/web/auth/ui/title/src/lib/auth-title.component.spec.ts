import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTitleComponent } from './auth-title.component';
import { AuthTitleComponentPo } from './auth-title.component.po';

describe('AuthTitleComponent', () => {
  let pageObject: AuthTitleComponentPo;
  let fixture: ComponentFixture<AuthTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthTitleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthTitleComponent);
    pageObject = new AuthTitleComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.title).toBe('');
  });
});
