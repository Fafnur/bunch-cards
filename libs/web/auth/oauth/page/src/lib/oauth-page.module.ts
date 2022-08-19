import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SpinnerModule } from '@bunch/web/ui/spinner';

import { OauthPageComponent } from './oauth-page.component';
import { OauthPageRoutingModule } from './oauth-page-routing.module';

@NgModule({
  imports: [CommonModule, OauthPageRoutingModule, SpinnerModule],
  declarations: [OauthPageComponent],
})
export class OauthPageModule {}
