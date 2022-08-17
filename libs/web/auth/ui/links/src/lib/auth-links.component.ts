import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';

import { NavigationPaths, PATHS } from '@bunch/core/navigation';

@Component({
  selector: 'bunch-auth-links',
  templateUrl: './auth-links.component.html',
  styleUrls: ['./auth-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLinksComponent {
  @Input() mode: 'signin' | 'signup' = 'signin';

  constructor(@Inject(PATHS) public readonly paths: NavigationPaths) {}
}
