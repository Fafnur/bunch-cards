import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockModule } from 'ng-mocks';

import { AUTH_SECRETS_STUB } from '@bunch/auth/common';

import { ResetNotifyComponent } from './reset-notify.component';
import { ResetNotifyComponentPo } from './reset-notify.component.po';

describe('ResetNotifyComponent', () => {
  let pageObject: ResetNotifyComponentPo;
  let fixture: ComponentFixture<ResetNotifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, NoopAnimationsModule, MockModule(MatDialogModule), MockModule(MatButtonModule)],
      declarations: [ResetNotifyComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: AUTH_SECRETS_STUB,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetNotifyComponent);
    pageObject = new ResetNotifyComponentPo(fixture);
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show', () => {
    fixture.detectChanges();

    expect(pageObject.title).toBeTruthy();
    expect(pageObject.content).toBeTruthy();
    expect(pageObject.close).toBeTruthy();
  });
});
