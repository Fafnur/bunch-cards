import { NgModule } from '@angular/core';

import { ContainerModule } from '@bunch/web/ui/container';

import { CopyrightModule } from '../copyright/copyright.module';
import { FooterComponent } from './footer.component';

@NgModule({
  imports: [ContainerModule, CopyrightModule],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule {}
