import { Component, OnInit } from '@angular/core';

import { setStatusBarColor } from './utils';

@Component({
  selector: 'app-root',
  template: '<page-router-outlet></page-router-outlet>',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    setStatusBarColor('dark', '#97d9e9');
  }
}
