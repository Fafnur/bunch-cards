import { PageObject } from '@bunch/core/testing';

export class ManagementPageComponentPo extends PageObject {
  get collection() {
    return this.getByAutomationId('collection');
  }

  get create() {
    return this.getByAutomationId('create');
  }
}
