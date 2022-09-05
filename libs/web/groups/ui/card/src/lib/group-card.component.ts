import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { NavigationPaths, NavigationService } from '@bunch/core/navigation';
import { Group } from '@bunch/groups/common';

@Component({
  selector: 'bunch-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCardComponent implements OnInit {
  @Input() group?: Group;
  @Input() editing = false;
  @Input() viewing = false;

  paths!: NavigationPaths;

  constructor(private readonly navigationService: NavigationService) {}

  ngOnInit(): void {
    this.paths = this.navigationService.getPaths();
  }
}
