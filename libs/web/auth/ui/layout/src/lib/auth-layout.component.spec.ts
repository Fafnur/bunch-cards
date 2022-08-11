import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';

import { AuthPromoModule } from '@bunch/web/auth/ui/promo';
import { ContainerModule } from '@bunch/web/ui/container';
import { GridModule } from '@bunch/web/ui/grid';

import { AuthLayoutComponent } from './auth-layout.component';
import { AuthLayoutComponentPo } from './auth-layout.component.po';

describe('AuthLayoutComponent', () => {
  let pageObject: AuthLayoutComponentPo;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(ContainerModule), MockModule(GridModule), MockModule(AuthPromoModule)],
      declarations: [AuthLayoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLayoutComponent);
    pageObject = new AuthLayoutComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.container).toBeTruthy();
    expect(pageObject.promo).toBeTruthy();
    expect(pageObject.outlet).toBeTruthy();
  });
});
