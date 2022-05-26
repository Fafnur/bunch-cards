import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-apple';
import * as path from 'path';

export interface AppleUser {
  email: string;
  firstname: string;
  lastname: string;
  photo: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class ApplePassportStrategy extends PassportStrategy(Strategy, 'apple') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('APPLE_CLIENT_ID_WEB') ?? '',
      teamID: configService.get<string>('APPLE_TEAM_ID_WEB') ?? '',
      callbackURL: configService.get<string>('APPLE_CALLBACK_URL_WEB') ?? '',
      keyID: configService.get<string>('APPLE_KEYID') ?? '',
      privateKeyLocation: path.join(__dirname, `/assets/keys/AuthKey_${configService.get<string>('APPLE_KEYID')}.p8`),
      passReqToCallback: true,
    });
    if (!configService.get<string>('APPLE_CLIENT_ID_WEB') || !configService.get<string>('APPLE_KEYID')) {
      console.warn('Apple credentials not found.');
    }
  }

  async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void> {
    const firstname = req.body.user?.name?.firstName ?? undefined;
    const lastname = req.body.user?.name.lastName ?? undefined;
    const email = req.body.user?.email ?? undefined;

    console.log(refreshToken);
    const user: Partial<AppleUser> = {
      email,
      firstname,
      lastname,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
