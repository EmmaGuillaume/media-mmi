import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getName() {
    return this.appService.getName();
  }

  @Get()
  getHeaders(@Req() req: Request) {
    console.log(req.headers.authorization);

    const userAgent = req.get('Authorization');
    console.log(userAgent);
  }
}
