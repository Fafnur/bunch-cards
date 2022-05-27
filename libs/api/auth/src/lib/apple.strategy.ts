import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
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
  constructor(private readonly configService: ConfigService, private readonly jwtService: JwtService) {
    super(
      {
        clientID: configService.get<string>('APPLE_CLIENT_ID_WEB') ?? '',
        teamID: configService.get<string>('APPLE_TEAM_ID_WEB') ?? '',
        callbackURL: configService.get<string>('APPLE_CALLBACK_URL_WEB') ?? '',
        keyID: configService.get<string>('APPLE_KEYID') ?? '',
        privateKeyLocation: path.join(__dirname, `/assets/keys/AuthKey_${configService.get<string>('APPLE_KEYID')}.p8`),
        passReqToCallback: true,
      },
      async (request: any, accessToken: string, refreshToken: string, params: string, profile: any, done: VerifyCallback) => {
        const token = this.jwtService.decode(params) as { email?: string };

        const userInfo = request.body.user ? JSON.parse(request.body.user) : {};

        const firstname = userInfo.name?.firstName ?? token?.email;
        const lastname = userInfo?.name?.lastName ?? '';
        const email = userInfo?.email ?? token?.email ?? '';

        const user: Partial<AppleUser> = {
          email,
          firstname,
          lastname,
          accessToken,
          refreshToken,
        };

        return done(null, user);
      }
    );
    if (!configService.get<string>('APPLE_CLIENT_ID_WEB') || !configService.get<string>('APPLE_KEYID')) {
      console.warn('Apple credentials not found.');
    }
  }

  // TODO: Wrong count params for validate.
  // async validate(req: any, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void> {
  //   const firstname = req.body.user?.name?.firstName ?? undefined;
  //   const lastname = req.body.user?.name.lastName ?? undefined;
  //   const email = req.body.user?.email ?? undefined;
  //
  //   const user: Partial<AppleUser> = {
  //     email,
  //     firstname,
  //     lastname,
  //     accessToken,
  //     refreshToken,
  //   };
  //
  //   done(null, user);
  // }
}
