import { PageObject } from '@bunch/core/testing';

export class GroupsCollectionComponentPo extends PageObject {
  get columns() {
    return this.getAllByAutomationId('column');
  }

  get drops() {
    return this.getAllByAutomationId('drop');
  }
}
