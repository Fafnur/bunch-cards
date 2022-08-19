import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';

import { SpinnerModule } from '@bunch/web/ui/spinner';

import { OauthPageComponent } from './oauth-page.component';
import { OauthPageComponentPo } from './oauth-page.component.po';

describe('OauthPageComponent', () => {
  let pageObject: OauthPageComponentPo;
  let fixture: ComponentFixture<OauthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(SpinnerModule)],
      declarations: [OauthPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OauthPageComponent);
    pageObject = new OauthPageComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.spinner).toBeTruthy();
  });
});
