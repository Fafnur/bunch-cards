import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { NavigationPaths, PATHS } from '@bunch/core/navigation';

@Component({
  selector: 'bunch-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCreateComponent {
  constructor(@Inject(PATHS) public readonly paths: NavigationPaths) {}
}
