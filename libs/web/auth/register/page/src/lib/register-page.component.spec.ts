import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';

import { RegisterFormModule } from '@bunch/web/auth/register/ui/form';
import { AuthTitleModule } from '@bunch/web/auth/ui/title';

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
