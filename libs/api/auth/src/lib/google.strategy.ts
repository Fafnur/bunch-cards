import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';

export interface GoogleUser {
  email: string;
  firstname: string;
  lastname: string;
  photo: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID_WEB') ?? '',
      clientSecret: configService.get<string>('GOOGLE_SECRET_WEB') ?? '',
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL_WEB') ?? '',
      scope: ['email', 'profile', 'openid'],
    });
    if (!configService.get<string>('GOOGLE_CLIENT_ID_WEB') || !configService.get<string>('GOOGLE_SECRET_WEB')) {
      console.warn('Google credentials not found.');
    }
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<void> {
    const { name, emails, photos } = profile;

    const user: Partial<GoogleUser> = {
      email: emails?.[0].value,
      firstname: name?.givenName,
      lastname: name?.familyName,
      photo: photos?.[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
