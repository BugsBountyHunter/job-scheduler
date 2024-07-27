import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Check Server  Running' })
  @ApiResponse({ status: 200, description: 'Check Server Running Status.' })
  @Get('check-health')
  checkHealth(): string {
    return this.appService.getHello();
  }
}
