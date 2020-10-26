import { Controller, Get } from '@nestjs/common';

@Controller()
export default class HealthController {

  @Get('alive')
  alive(): void {
    return;
  }

  @Get('ready')
  ready(): void {
    return;
  }
}
