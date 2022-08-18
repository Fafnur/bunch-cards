import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { NavigationPaths, PATHS } from '@bunch/core/navigation';

@Component({
  selector: 'bunch-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthSigninComponent {
  constructor(@Inject(PATHS) public readonly paths: NavigationPaths) {}
}
