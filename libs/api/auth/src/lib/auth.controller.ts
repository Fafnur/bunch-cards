import { Body, Controller, Get, Param, Post, Redirect, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { formExceptionFactory } from '@bunch/api/forms';
import { UserCreateForm } from '@bunch/api/users';
import { UserCredentials, UserPasswordChange, UserSecrets } from '@bunch/users/common';

import { AppleUser } from './apple.strategy';
import { AuthService } from './auth.service';
import { GoogleUser } from './google.strategy';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() credentials: UserCredentials) {
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

  @Post('auth/register')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (validationErrors) => formExceptionFactory(validationErrors),
    })
  )
  async register(@Body() payload: UserCreateForm) {
    return this.authService.register(payload);
  }

  @Get('auth/confirm/:token')
  async confirmEmail(@Param() params: { token: string }) {
    return this.authService.confirmEmail(params);
  }

  @Get('web/google')
  @UseGuards(AuthGuard('google'))
  async authWithGoogle() {
    // google redirect
  }

  @Get('web/google/redirect')
  @Redirect()
  @UseGuards(AuthGuard('google'))
  async authWithGoogleRedirect(@Req() request: { user?: GoogleUser }) {
    return await this.authService.loginWithGoogle(request.user);
  }

  @Get('web/apple')
  @UseGuards(AuthGuard('apple'))
  async authWithApple() {
    // apple redirect
  }

  @Post('web/apple/redirect')
  @Redirect()
  @UseGuards(AuthGuard('apple'))
  async authWithAppleRedirect(@Req() request: { user?: AppleUser }) {
    return await this.authService.loginWithApple(request.user);
  }
}
