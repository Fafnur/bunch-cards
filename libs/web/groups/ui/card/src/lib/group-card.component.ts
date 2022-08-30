import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Group } from '@bunch/groups/common';

@Component({
  selector: 'bunch-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCardComponent {
  @Input() group?: Group;
}
