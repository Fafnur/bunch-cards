import { NgModule } from '@angular/core';

import { NavigationService } from '@bunch/core/navigation';

import { WebNavigationService } from './navigation.service';

@NgModule({
  providers: [
    {
      provide: NavigationService,
      useClass: WebNavigationService,
    },
  ],
})
export class NavigationModule {}
