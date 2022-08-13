import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {}
