import { APP_INITIALIZER, NgModule } from '@angular/core';

import { UserApiModule } from '@bunch/users/api';

import { UserSyncService } from './user-sync.service';

export function userSyncFactory(userSyncService: UserSyncService) {
  return () => userSyncService.sync();
}

@NgModule({
  imports: [UserApiModule],
  providers: [
    UserSyncService,
    {
      provide: APP_INITIALIZER,
      useFactory: userSyncFactory,
      multi: true,
      deps: [UserSyncService],
    },
  ],
})
export class UserSyncModule {}
