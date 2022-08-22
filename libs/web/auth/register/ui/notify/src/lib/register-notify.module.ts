import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { RegisterNotifyComponent } from './register-notify.component';
import { RegisterNotifyService } from './register-notify.service';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  declarations: [RegisterNotifyComponent],
  exports: [RegisterNotifyComponent],
  providers: [RegisterNotifyService],
})
export class RegisterNotifyModule {}
