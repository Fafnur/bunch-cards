import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Page } from '@nativescript/core';
import { TabSelectedEventData } from '@nativescript-community/ui-material-bottomnavigationbar';

import { NavigationPaths, PATHS } from '@bunch/core/navigation';

@Component({
  moduleId: module.id,
  selector: 'bunch-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent implements OnInit {
  navs!: Record<string, string>;

  constructor(
    private readonly page: Page,
    private readonly routerExtensions: RouterExtensions,
    @Inject(PATHS) private readonly paths: NavigationPaths
  ) {
    this.page.actionBarHidden = true;
  }

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
