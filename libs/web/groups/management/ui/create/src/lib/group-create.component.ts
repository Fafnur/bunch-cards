import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { NavigationPaths, NavigationService } from '@bunch/core/navigation';

@Component({
  selector: 'bunch-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCreateComponent implements OnInit {
  paths!: NavigationPaths;

  constructor(private readonly navigationService: NavigationService) {}

  ngOnInit(): void {
    this.paths = this.navigationService.getPaths();
  }
}
