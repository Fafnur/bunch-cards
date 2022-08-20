import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';

import { EnvironmentService } from '@bunch/core/environments';
import { NavigationPaths, PATHS } from '@bunch/core/navigation';
import { IconService, logoIcon } from '@bunch/web/core/icons';

@Component({
  selector: 'bunch-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent implements OnInit {
  brand!: string;

  constructor(
    private readonly iconService: IconService,
    private readonly environmentService: EnvironmentService,
    @Inject(PATHS) public readonly paths: NavigationPaths
  ) {
    this.iconService.add('bunchLogo', logoIcon);
  }

  ngOnInit(): void {
    this.brand = this.environmentService.getEnvironments().brand;
  }
}
