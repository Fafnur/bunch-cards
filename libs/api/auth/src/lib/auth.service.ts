import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

import { PasswordService } from '@bunch/api/passwords';
import { UserService } from '@bunch/api/users';
import { User, UserAuth, UserCredentials, UserPasswordChange, UserSecrets, UserStatus } from '@bunch/users/common';

import { AppleUser } from './apple.strategy';
import { GoogleUser } from './google.strategy';

@Injectable()
export class AuthService {
  private readonly frontUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
    private readonly mailerService: MailerService
  ) {
    this.frontUrl = this.configService.get<string>('FRONT_HOST') ?? 'http://localhost:4200';
  }

  async loginWithGoogle(googleUser?: GoogleUser): Promise<{ url: string }> {
    if (!googleUser) {
      throw new BadRequestException('No user from google');
    }

    const user =
      (await this.userService.findOneByEmail(googleUser.email)) ??
      (await this.userService.createUser({
        email: googleUser.email,
        photo: googleUser.photo,
        firstname: googleUser.firstname,
        lastname: googleUser.lastname,
        username: `${googleUser.firstname} ${googleUser.lastname}`,
        status: UserStatus.Verified,
      }));

    const token = this.jwtService.sign({ userId: user.id });

    return { url: `${this.frontUrl}/auth/oauth?token=${token}&id=${user.id}` };
  }

  async loginWithApple(appleUser?: AppleUser): Promise<{ url: string }> {
    if (!appleUser) {
      throw new BadRequestException('No user from apple');
    }

    console.log(appleUser);

    const user =
      (await this.userService.findOneByEmail(appleUser.email)) ??
      (await this.userService.createUser({
        email: appleUser.email,
        photo: appleUser.photo,
        firstname: appleUser.firstname,
        lastname: appleUser.lastname,
        username: `${appleUser.firstname} ${appleUser.lastname}`,
        status: UserStatus.Verified,
      }));

    const token = this.jwtService.sign({ userId: user.id });

    return { url: `${this.frontUrl}/auth/oauth?token=${token}&id=${user.id}` };
  }

  async validateUserCredentials(credentials: UserCredentials): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOneByEmail(credentials.username);

    const valid = user ? await this.passwordService.compareHash(credentials.password, user.password) : false;

    if (user && valid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  async loginWithEmail(credentials: UserCredentials): Promise<UserAuth> {
    const user = await this.validateUserCredentials(credentials);

    if (!user || user.status === UserStatus.Created) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      id: user.id,
    };
  }

  async reset(secrets: UserSecrets): Promise<void> {
    const user = (await this.userService.findOneByEmail(secrets.email)) ?? null;

    if (!user) {
      throw new BadRequestException();
    }
    const resetToken = this.passwordService.generatePassword();

    if (this.frontUrl.indexOf('localhost') < 0) {
      await this.mailerService.sendMail({
        to: secrets.email,
        subject: 'Reset password',
        template: 'reset',
        context: {
          link: `${this.frontUrl}/auth/reset?token=${resetToken}`,
        },
      });
    }

    return await this.userService.update(user.id, { reset: resetToken, resetAt: new Date().toISOString() }).then(() => undefined);
  }

  async changePassword(payload: UserPasswordChange): Promise<void> {
    const user = (await this.userService.findOneByReset(payload.token)) ?? null;

    if (!user) {
      throw new BadRequestException();
    }
    const password = await this.passwordService.getHash(payload.password);

    return await this.userService.update(user.id, { password }).then(() => undefined);
  }

  // async register(secrets: UserSecrets): Promise<void> {
  //   const user = await this.validateUserSecrets(secrets);
  //
  //   if (!user) {
  //     throw new BadRequestException();
  //   }
  //   const password = this.passwordService.generatePassword();
  //   // NOTE: DON'T USE IT ON PRODUCTION.
  //   console.log(password);
  //
  //   const hash = await this.passwordService.getHash(password);
  //
  //   return await this.userService.updatePassword(user, hash).then(() => undefined);
  // }
}
