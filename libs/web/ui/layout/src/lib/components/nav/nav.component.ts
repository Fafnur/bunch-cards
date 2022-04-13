import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import { NavigationLink, NavigationPaths, PATHS } from '@bunch/core/navigation';

export function getLinks(paths: NavigationPaths): NavigationLink[] {
  return [
    {
      route: paths.home,
      label: 'home',
      routerLinkActiveOptions: {
        exact: true,
      },
    },
    {
      route: paths.support,
      label: 'chat',
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

  constructor(@Inject(PATHS) public readonly paths: NavigationPaths) {}

  ngOnInit(): void {
    this.links = getLinks(this.paths);
  }

  trackByFn(index: number, link: NavigationLink): string {
    return link.route;
  }
}
