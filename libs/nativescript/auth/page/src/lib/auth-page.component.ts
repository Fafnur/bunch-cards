import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bunch-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {}
