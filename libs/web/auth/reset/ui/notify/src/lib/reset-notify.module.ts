import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { ResetNotifyComponent } from './reset-notify.component';
import { ResetNotifyService } from './reset-notify.service';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [ResetNotifyComponent],
  providers: [ResetNotifyService],
})
export class ResetNotifyModule {}
