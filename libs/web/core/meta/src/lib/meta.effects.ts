import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { RouterNavigatedAction } from '@ngrx/router-store/src/actions';
import { fetch } from '@nrwl/angular';

import { RouterReducerStateExtended } from '@bunch/core/store/root';

import { MetaConfig, MetaConfigOg } from './meta.interface';
import { MetaService } from './meta.service';

type NavigationActon = RouterNavigatedAction<
  RouterReducerStateExtended<{
    meta?: Partial<MetaConfig>;
    metaOg?: Partial<MetaConfigOg>;
  }>
>;

@Injectable()
export class MetaEffects {
  routerNavigated$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      fetch({
        run: (action: NavigationActon) => {
          const { meta, metaOg } = action.payload.routerState?.data ?? {};
          this.metaService.update(
            {
              url: action.payload.routerState.url,
              ...meta,
            },
            metaOg
          );
        },
      })
    );
  });

  constructor(private readonly actions$: Actions, private readonly metaService: MetaService) {}
}
