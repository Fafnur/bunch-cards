import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContainerModule } from '@bunch/web/ui/container';

import { LogoModule } from '../logo/logo.module';
import { NavModule } from '../nav/nav.module';
import { HeaderComponent } from './header.component';

@NgModule({
  imports: [CommonModule, ContainerModule, LogoModule, NavModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
