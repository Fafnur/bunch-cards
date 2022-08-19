import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NavigationService } from '@bunch/core/navigation';

@Component({
  selector: 'bunch-oauth-page',
  templateUrl: './oauth-page.component.html',
  styleUrls: ['./oauth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OauthPageComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute, private readonly navigationService: NavigationService) {}

  ngOnInit(): void {
    const { token } = this.route.snapshot.params;
    if (token) {
      //
    } else {
      //
    }
  }
}
