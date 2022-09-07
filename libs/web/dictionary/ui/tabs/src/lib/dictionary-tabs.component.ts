import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { NavigationLink, NavigationPaths, NavigationService } from '@bunch/core/navigation';

export function getLinks(paths: NavigationPaths): NavigationLink[] {
  return [
    {
      route: paths.groupsManagement,
      label: $localize`:Dictionary tabs|:Lists`,
    },
    {
      route: paths.cardsManagement,
      label: $localize`:Dictionary tabs|:Cards`,
    },
  ];
}

@Component({
  selector: 'bunch-dictionary-tabs',
  templateUrl: './dictionary-tabs.component.html',
  styleUrls: ['./dictionary-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionaryTabsComponent implements OnInit {
  links!: NavigationLink[];

  constructor(private readonly navigationService: NavigationService) {}

  ngOnInit(): void {
    this.links = getLinks(this.navigationService.getPaths());
  }
}
