import { PageObject } from '@bunch/core/testing';

export class DictionaryTabsComponentPo extends PageObject {
  get nav() {
    return this.getByAutomationId('nav');
  }

  get links() {
    return this.getAllByAutomationId('link');
  }
}
