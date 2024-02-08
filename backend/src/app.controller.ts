import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('ping')
  ping(): object {
    return { message: 'pong' };
  }
}
