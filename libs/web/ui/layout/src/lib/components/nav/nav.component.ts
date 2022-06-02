import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import { NavigationLink, NavigationPaths, PATHS } from '@bunch/core/navigation';

export function getLinks(paths: NavigationPaths): NavigationLink[] {
  return [
    {
      route: paths.dashboard,
      label: $localize`:Nav link|:Dashboard`,
      icon: 'dashboard',
    },
    {
      route: paths.learning,
      label: $localize`:Nav link|:Learning`,
      icon: 'school',
    },
    {
      route: paths.dictionary,
      label: $localize`:Nav link|:Dictionary`,
      icon: 'view_carousel',
    },
    {
      route: paths.settings,
      label: $localize`:Nav link|:Settings`,
      icon: 'settings',
    },
  ];
}

@Component({
  selector: 'bunch-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  links!: NavigationLink[];

  constructor(@Inject(PATHS) private readonly paths: NavigationPaths) {}

  ngOnInit(): void {
    this.links = getLinks(this.paths);
  }

  trackByFn(index: number, link: NavigationLink): string {
    return link.route;
  }
}
