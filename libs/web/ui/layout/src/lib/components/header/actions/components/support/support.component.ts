import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { NavigationPaths, PATHS } from '@bunch/core/navigation';

@Component({
  selector: 'bunch-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportComponent {
  constructor(@Inject(PATHS) public readonly paths: NavigationPaths) {}
}
