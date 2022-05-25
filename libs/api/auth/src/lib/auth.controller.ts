import { Body, Controller, Get, Post, Redirect, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserCredentials, UserPasswordChange, UserSecrets } from '@bunch/users/common';

import { AuthService } from './auth.service';
import { GoogleUser } from './google.strategy';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() credentials: UserCredentials) {
    return this.authService.loginWithEmail(credentials);
  }

  @Post('auth/login-with-token')
  async loginByToken(@Body() credentials: UserCredentials) {
    return this.authService.loginWithEmail(credentials);
  }

  @Post('auth/reset')
  async reset(@Req() req: Request, @Body() secrets: UserSecrets) {
    return this.authService.reset(secrets);
  }

  @Post('auth/change-password')
  async changePassword(@Body() body: UserPasswordChange) {
    return this.authService.changePassword(body);
  }

  // @Post('auth/register')
  // async register(@Body() secrets: UserSecrets): Promise<void> {
  //   return this.authService.register(secrets);
  // }

  @Get('web/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // google redirect
  }

  @Get('web/google/redirect')
  @Redirect()
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() request: { user?: GoogleUser }) {
    return await this.authService.loginWithGoogle(request.user);
  }
}
