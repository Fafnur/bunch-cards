import { PageObject } from '@bunch/core/testing';

export class ManagementPageComponentPo extends PageObject {
  get table() {
    return this.getByAutomationId('table');
  }
}
