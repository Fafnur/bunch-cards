import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AuthSecrets } from '@bunch/auth/common';

@Component({
  selector: 'bunch-reset-notify',
  templateUrl: './reset-notify.component.html',
  styleUrls: ['./reset-notify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetNotifyComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly secrets: AuthSecrets) {}
}
