import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockModule } from 'ng-mocks';

import { ResetFormModule } from '@bunch/web/auth/reset/ui/form';
import { AuthLinksModule } from '@bunch/web/auth/ui/links';
import { AuthSigninModule } from '@bunch/web/auth/ui/signin';
import { AuthTitleModule } from '@bunch/web/auth/ui/title';

import { ResetPageComponent } from './reset-page.component';
import { ResetPageComponentPo } from './reset-page.component.po';

describe('ResetPageComponent', () => {
  let pageObject: ResetPageComponentPo;
  let fixture: ComponentFixture<ResetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MockModule(ResetFormModule),
        MockModule(AuthTitleModule),
        MockModule(AuthLinksModule),
        MockModule(AuthSigninModule),
      ],
      declarations: [ResetPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPageComponent);
    pageObject = new ResetPageComponentPo(fixture);
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
