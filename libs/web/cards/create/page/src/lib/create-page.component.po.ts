import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

export class CreatePageComponentPo extends PageObject {
  get form(): DebugElement | null {
    return this.getByAutomationId('form');
  }
}
