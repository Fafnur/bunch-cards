import { MatDialog } from '@angular/material/dialog';
import { hot } from 'jasmine-marbles';
import { deepEqual, instance, mock, when } from 'ts-mockito';

import { AUTH_SECRETS_STUB } from '@bunch/auth/common';

import { ResetNotifyComponent } from './reset-notify.component';
import { ResetNotifyService } from './reset-notify.service';

describe('ResetNotifyService', () => {
  let service: ResetNotifyService;
  let matDialogMock: MatDialog;

  beforeEach(() => {
    matDialogMock = mock(MatDialog);

    service = new ResetNotifyService(instance(matDialogMock));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be show', () => {
    const expected = hot('a', { a: true });

    when(matDialogMock.open(ResetNotifyComponent, deepEqual({ data: AUTH_SECRETS_STUB, disableClose: true })).afterClosed()).thenReturn(
      expected
    );

    expect(service.open(AUTH_SECRETS_STUB)).toBeObservable(expected);
  });
});
