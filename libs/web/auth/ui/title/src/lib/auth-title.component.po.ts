import { PageObject } from '@bunch/core/testing';

enum Automation {
  Title = 'title',
}

export class AuthTitleComponentPo extends PageObject {
  get title(): string | null {
    return this.text(Automation.Title);
  }
}
