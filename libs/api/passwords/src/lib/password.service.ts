import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class PasswordService {
  /**
   * @see https://github.com/kelektiv/node.bcrypt.js#readme
   */
  private saltRounds = 10;

  generatePassword(): string {
    return randomBytes(5)
      .toString('hex')
      .split('')
      .map((item) => (Math.random() > 0.5 ? item.toUpperCase() : item))
      .join('');
  }

  getHash(password: string): Promise<string> {
    return hash(password, this.saltRounds);
  }

  compareHash(password: string, passwordHash: string): Promise<boolean> {
    return compare(password, passwordHash);
  }
}
