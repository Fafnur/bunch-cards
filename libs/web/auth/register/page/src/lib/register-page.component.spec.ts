import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';

import { AuthTitleModule } from '@bunch/web/auth/ui/title';

import { RegisterFormModule } from './components/register-form/register-form.module';
import { RegisterPageComponent } from './register-page.component';
import { RegisterPageComponentPo } from './register-page.component.po';

describe('RegisterPageComponent', () => {
  let pageObject: RegisterPageComponentPo;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MockModule(RegisterFormModule), MockModule(AuthTitleModule)],
      declarations: [RegisterPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    pageObject = new RegisterPageComponentPo(fixture);
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
