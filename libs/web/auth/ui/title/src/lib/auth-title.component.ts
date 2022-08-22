import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-auth-title',
  templateUrl: './auth-title.component.html',
  styleUrls: ['./auth-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthTitleComponent {}
