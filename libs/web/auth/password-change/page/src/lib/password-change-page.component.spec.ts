import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';

import { ResetFormModule } from '@bunch/web/auth/reset/ui/form';
import { AuthLinksModule } from '@bunch/web/auth/ui/links';
import { AuthSigninModule } from '@bunch/web/auth/ui/signin';
import { AuthTitleModule } from '@bunch/web/auth/ui/title';

import { PasswordChangePageComponent } from './password-change-page.component';
import { PasswordChangePageComponentPo } from './password-change-page.component.po';

describe('PasswordChangePageComponent', () => {
  let pageObject: PasswordChangePageComponentPo;
  let fixture: ComponentFixture<PasswordChangePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MockModule(ResetFormModule),
        MockModule(AuthTitleModule),
        MockModule(AuthLinksModule),
        MockModule(AuthSigninModule),
      ],
      declarations: [PasswordChangePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordChangePageComponent);
    pageObject = new PasswordChangePageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.form).toBeTruthy();
    expect(pageObject.title).toBeTruthy();
    expect(pageObject.signin).toBeTruthy();
    expect(pageObject.links).toBeTruthy();
  });
});
