import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getData(): { message: string } {
    return { message: 'Welcome to api-cards!' };
  }
}
