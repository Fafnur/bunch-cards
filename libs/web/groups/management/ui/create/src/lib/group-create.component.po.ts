import { PageObject } from '@bunch/core/testing';

export class GroupCreateComponentPo extends PageObject {
  get card() {
    return this.getByAutomationId('card');
  }

  get create() {
    return this.getByAutomationId('create');
  }
}
