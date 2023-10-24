import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { Request } from 'express';

@Controller()
@UseInterceptors(AuthInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getName() {
  //   return this.appService.getName();
  // }

  @Get()
  getExampleData(@Req() request: Request) {
    // The 'Authorization' header can be accessed here
    const authorizationHeader = request.headers.authorization;
    // const authorizationHeader = request.headers;

    console.log('auth Header : ', authorizationHeader);
    return 'Example Data';
  }
}