import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

export class SettingsPageComponentPo extends PageObject {
  get logout(): DebugElement | null {
    return this.getByAutomationId('logout');
  }
}
