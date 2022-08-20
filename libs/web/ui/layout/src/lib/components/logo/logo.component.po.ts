import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

enum Automation {
  Link = 'link',
  Icon = 'icon',
  Brand = 'brand',
}

export class LogoComponentPo extends PageObject {
  get link(): DebugElement | null {
    return this.getByAutomationId(Automation.Link);
  }

  get icon(): DebugElement | null {
    return this.getByAutomationId(Automation.Icon);
  }

  get brand(): DebugElement | null {
    return this.getByAutomationId(Automation.Brand);
  }

  get brandText(): string | null {
    return this.text(Automation.Brand);
  }
}
