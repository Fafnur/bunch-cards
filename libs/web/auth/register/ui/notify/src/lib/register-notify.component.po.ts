import { DebugElement } from '@angular/core';

import { PageObject } from '@bunch/core/testing';

export class RegisterNotifyComponentPo extends PageObject {
  get title(): DebugElement | null {
    return this.getByAutomationId('title');
  }

  get content(): DebugElement | null {
    return this.getByAutomationId('content');
  }

  get close(): DebugElement | null {
    return this.getByAutomationId('close');
  }

  triggerClose(): void {
    this.triggerEventHandler(this.close, 'click');
  }
}
