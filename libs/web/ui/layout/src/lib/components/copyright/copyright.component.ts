import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { EnvironmentService } from '@bunch/core/environments';

@Component({
  selector: 'bunch-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CopyrightComponent implements OnInit {
  @Input() short = false;

  year!: number;
  brand!: string;

  constructor(private readonly environmentService: EnvironmentService) {}

  get copyright(): string {
    return !this.short ? `© 2021-${this.year} «${this.brand}»` : `© ${this.year}`;
  }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    this.brand = this.environmentService.getEnvironments().brand;
  }
}
