import { Component, OnInit } from '@angular/core';

import { setStatusBarColor } from '../../../utils';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    setStatusBarColor('dark', '#97d9e9');
  }
}
