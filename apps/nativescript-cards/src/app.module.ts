import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NavModule } from '@bunch/nativescript/ui/nav';

import { AppComponent } from './app.component';
import { AppCoreModule } from './app.core.module';
import { AppRoutingModule } from './app.routing';

@NgModule({
  imports: [AppCoreModule, NavModule, AppRoutingModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
