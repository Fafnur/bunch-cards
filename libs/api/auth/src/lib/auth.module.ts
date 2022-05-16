import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PasswordsModule } from '@bunch/api/passwords';
import { UserModule } from '@bunch/api/users';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './google.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    PasswordsModule,
    JwtModule.register({
      secret: process.env?.['JWT_SECRET'] ?? '',
      signOptions: { expiresIn: process.env?.['JWT_EXPIRES_IN'] ?? '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
