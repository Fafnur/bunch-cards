import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { TabSelectedEventData } from '@nativescript-community/ui-material-bottomnavigationbar';

import { NavigationPaths, PATHS } from '@bunch/core/navigation';

@Component({
  moduleId: module.id,
  selector: 'bunch-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  navs!: Record<string, string>;

  constructor(private routerExtensions: RouterExtensions, @Inject(PATHS) private readonly paths: NavigationPaths) {}

  ngOnInit(): void {
    /* eslint-disable @typescript-eslint/naming-convention */
    this.navs = {
      0: this.paths.dashboard,
      1: this.paths.learning,
      2: this.paths.dictionary,
      3: this.paths.settings,
    };
    /* eslint-enable @typescript-eslint/naming-convention */
  }

  onBottomNavigationTabSelected(tab: TabSelectedEventData): void {
    void this.routerExtensions.navigateByUrl(this.navs[tab.newIndex]);
  }
}
