import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-reset-page',
  templateUrl: './password-change-page.component.html',
  styleUrls: ['./password-change-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordChangePageComponent {}
