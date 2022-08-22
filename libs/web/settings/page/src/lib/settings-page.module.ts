import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { SettingsPageComponent } from './settings-page.component';
import { SettingsPageRoutingModule } from './settings-page-routing.module';

@NgModule({
  imports: [CommonModule, SettingsPageRoutingModule, MatButtonModule],
  declarations: [SettingsPageComponent],
  exports: [SettingsPageComponent],
})
export class SettingsPageModule {}
