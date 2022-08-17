import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';

import { LoginFormModule } from '@bunch/web/auth/login/ui/form';
import { AuthTitleModule } from '@bunch/web/auth/ui/title';

import { LoginPageComponent } from './login-page.component';
import { LoginPageComponentPo } from './login-page.component.po';

describe('LoginPageComponent', () => {
  let pageObject: LoginPageComponentPo;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MockModule(LoginFormModule), MockModule(AuthTitleModule)],
      declarations: [LoginPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    pageObject = new LoginPageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.form).toBeTruthy();
    expect(pageObject.title).toBeTruthy();
  });
});
