import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SettingsPageComponent } from './settings-page.component';
import { SettingsPageRoutingModule } from './settings-page-routing.module';

@NgModule({
  imports: [CommonModule, SettingsPageRoutingModule],
  declarations: [SettingsPageComponent],
  exports: [SettingsPageComponent],
})
export class SettingsPageModule {}
