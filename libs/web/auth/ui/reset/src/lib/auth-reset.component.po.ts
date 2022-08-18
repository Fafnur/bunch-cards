import { PageObject } from '@bunch/core/testing';

enum Automation {
  Link = 'link',
}

export class AuthResetComponentPo extends PageObject {
  get link(): string | null {
    return this.text(Automation.Link);
  }
}
