import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs';

import { AuthFacade } from '@bunch/auth/state';
import { NavigationService } from '@bunch/core/navigation';
import { DestroyService } from '@bunch/core/utils/destroy';

@Component({
  selector: 'bunch-oauth-page',
  templateUrl: './oauth-page.component.html',
  styleUrls: ['./oauth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class OauthPageComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly navigationService: NavigationService,
    private readonly authFacade: AuthFacade,
    private readonly destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    const { token, uuid } = this.route.snapshot.queryParams;

    if (token && uuid) {
      this.authFacade.oauthSuccess$
        .pipe(
          tap(() => {
            void this.navigationService.navigateByUrl(this.navigationService.getPaths().dashboard);
          }),
          takeUntil(this.destroy$)
        )
        .subscribe();

      this.authFacade.oauth({ accessToken: token, uuid });
    } else {
      void this.navigationService.navigateByUrl(this.navigationService.getPaths().authLogin);
    }
  }
}
