import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { AuthSecrets } from '@bunch/auth/common';

import { ResetNotifyComponent } from './reset-notify.component';

@Injectable()
export class ResetNotifyService {
  constructor(private readonly matDialog: MatDialog) {}

  open(data: AuthSecrets): Observable<boolean> {
    return this.matDialog.open(ResetNotifyComponent, { data, disableClose: true }).afterClosed();
  }
}
