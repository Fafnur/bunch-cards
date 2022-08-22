import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {}
