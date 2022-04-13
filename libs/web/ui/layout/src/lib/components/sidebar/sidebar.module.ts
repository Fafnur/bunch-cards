import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CopyrightModule } from '../copyright/copyright.module';
import { LogoModule } from '../logo/logo.module';
import { NavModule } from '../nav/nav.module';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  imports: [CommonModule, LogoModule, NavModule, CopyrightModule],
  declarations: [SidebarComponent],
  exports: [SidebarComponent],
})
export class SidebarModule {}
