import { Body, Controller, Get, Post, Redirect, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserAuth, UserCredentials, UserPasswordChange, UserSecrets } from '@bunch/users/common';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() credentials: UserCredentials): Promise<UserAuth> {
    return this.authService.loginWithEmail(credentials);
  }

  @Post('auth/login-with-token')
  async loginByToken(@Body() credentials: UserCredentials): Promise<UserAuth> {
    return this.authService.loginWithEmail(credentials);
  }

  @Post('auth/reset')
  async reset(@Req() req: Request, @Body() secrets: UserSecrets): Promise<void> {
    return this.authService.reset(secrets);
  }

  @Post('auth/change-password')
  async changePassword(@Body() body: UserPasswordChange): Promise<void> {
    return this.authService.changePassword(body);
  }

  // @Post('auth/register')
  // async register(@Body() secrets: UserSecrets): Promise<void> {
  //   return this.authService.register(secrets);
  // }

  @Get('web/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(): Promise<void> {
    // google redirect
  }

  @Get('web/google/redirect')
  @Redirect()
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request) {
    return await this.authService.loginWithGoogle(req);
  }
}
