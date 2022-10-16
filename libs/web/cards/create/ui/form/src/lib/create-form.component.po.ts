import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

export class CreateFormComponentPo extends PageObject {
  get form(): DebugElement | null {
    return this.getByAutomationId('form');
  }
}
