import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Container = 'container',
  Promo = 'promo',
  Outlet = 'outlet',
}

export class AuthLayoutComponentPo extends PageObject {
  get container(): DebugElement | null {
    return this.getByAutomationId(Automation.Container);
  }

  get promo(): DebugElement | null {
    return this.getByAutomationId(Automation.Promo);
  }

  get outlet(): DebugElement | null {
    return this.getByAutomationId(Automation.Outlet);
  }
}
