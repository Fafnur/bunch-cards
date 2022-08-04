import { Controller, Get, NotFoundException, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '@bunch/api/jwt/guards';
import { User, UserJwtCredentials } from '@bunch/users/common';

import { UserEntity } from './user.entity';
import { UserService } from './user.service';

export function castUser(userEntity: UserEntity): User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, reset, resetAt, confirm, confirmAt, ...user } = userEntity;

  return user;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async load(@Request() req: { user: UserJwtCredentials }): Promise<User> {
    const user = await this.userService.findOne(req.user.userId);

    if (!user) {
      throw new NotFoundException();
    }

    return castUser(user);
  }
}
