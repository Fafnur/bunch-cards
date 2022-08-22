import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bunch-auth-promo',
  templateUrl: './auth-promo.component.html',
  styleUrls: ['./auth-promo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPromoComponent {}
