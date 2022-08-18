import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockModule } from 'ng-mocks';

import { NavigationPipesModule, PATHS_STUB } from '@bunch/core/navigation';

import { AuthSigninComponent } from './auth-signin.component';
import { AuthSigninComponentPo } from './auth-signin.component.po';

describe('AuthSigninComponent', () => {
  let pageObject: AuthSigninComponentPo;
  let fixture: ComponentFixture<AuthSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, MockModule(NavigationPipesModule)],
      declarations: [AuthSigninComponent],
      providers: [PATHS_STUB],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthSigninComponent);
    pageObject = new AuthSigninComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.link).toBeTruthy();
  });
});
