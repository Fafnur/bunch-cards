import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { NavigationPaths, PATHS } from '@bunch/core/navigation';

@Component({
  selector: 'bunch-auth-reset',
  templateUrl: './auth-reset.component.html',
  styleUrls: ['./auth-reset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthResetComponent {
  constructor(@Inject(PATHS) public readonly paths: NavigationPaths) {}
}
