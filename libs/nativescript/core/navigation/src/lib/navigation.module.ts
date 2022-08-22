import { NgModule } from '@angular/core';

import { NavigationService } from '@bunch/core/navigation';

import { NativescriptNavigationService } from './navigation.service';

@NgModule({
  providers: [
    {
      provide: NavigationService,
      useClass: NativescriptNavigationService,
    },
  ],
})
export class NavigationModule {}
