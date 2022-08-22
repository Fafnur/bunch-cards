import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPromoComponent } from './auth-promo.component';
import { AuthPromoComponentPo } from './auth-promo.component.po';

describe('AuthPromoComponent', () => {
  let pageObject: AuthPromoComponentPo;
  let fixture: ComponentFixture<AuthPromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [AuthPromoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPromoComponent);
    pageObject = new AuthPromoComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.title).toBeTruthy();
    expect(pageObject.description).toBeTruthy();
  });
});
