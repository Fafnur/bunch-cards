import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Group } from '@bunch/groups/common';
import { GroupFacade } from '@bunch/groups/state';

@Component({
  selector: 'bunch-groups-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagementPageComponent implements OnInit {
  groups$!: Observable<Group[]>;

  constructor(private readonly groupFacade: GroupFacade) {}

  ngOnInit(): void {
    this.groups$ = this.groupFacade.groups$;
  }
}
