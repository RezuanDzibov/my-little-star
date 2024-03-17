import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('ping')
  @ApiOperation({
    summary: 'Check if service is up',
  })
  async ping() {
    return { message: 'pong' };
  }

  @Get('/')
  @ApiOperation({
    summary: 'Redirect to docs from root uri',
  })
  @Redirect('/api')
  async redirectToDocs() {}
}
