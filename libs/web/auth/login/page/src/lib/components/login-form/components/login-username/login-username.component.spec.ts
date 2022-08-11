import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUsernameComponent } from './login-username.component';

describe('LoginUsernameComponent', () => {
  let component: LoginUsernameComponent;
  let fixture: ComponentFixture<LoginUsernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginUsernameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
