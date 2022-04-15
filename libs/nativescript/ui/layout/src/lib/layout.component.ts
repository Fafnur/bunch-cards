import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabSelectedEventData } from '@nativescript-community/ui-material-bottomnavigationbar';

@Component({
  moduleId: module.id,
  selector: 'bunch-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  onBottomNavigationTabSelected(tab: TabSelectedEventData): void {
    // todo: add navigate
    console.log('onBottomNavigationTabSelected');
  }
  onBottomNavigationTabPressed(tab: TabSelectedEventData): void {
    // todo: add navigate
    console.log('onBottomNavigationTabPressed');
  }
}
