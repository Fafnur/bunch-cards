import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';

import { NavigationPaths, PATHS } from '@bunch/core/navigation';
import { appleDarkIcon, googleDarkIcon, IconService, logoDarkIcon } from '@bunch/web/core/icons';

@Component({
  selector: 'bunch-auth-links',
  templateUrl: './auth-links.component.html',
  styleUrls: ['./auth-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLinksComponent {
  @Input() mode: 'signin' | 'signup' = 'signin';

  constructor(private readonly iconService: IconService, @Inject(PATHS) public readonly paths: NavigationPaths) {
    this.iconService.add('logoDark', logoDarkIcon);
    this.iconService.add('appleDarkIcon', appleDarkIcon);
    this.iconService.add('googleDarkIcon', googleDarkIcon);
  }
}
