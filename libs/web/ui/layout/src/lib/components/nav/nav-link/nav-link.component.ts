import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-nav-link',
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLinkComponent {}
