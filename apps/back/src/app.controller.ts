import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthInterceptor } from './auth/auth.interceptor';

@Controller()
@UseInterceptors(AuthInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getName() {
  //   return this.appService.getName();
  // }
  // @Get()
  // getName() {
  //   return this.appService.getName();
  // }

  // @Get()
  // getLastArticle() {
  //   return this.appService.getLastArticle();
  // }

  @Get()
  createArticle() {
    return this.appService.createArticle(
      8,
      'EEEEEE',
      'content',
      'introduction',
      'https://img.lemde.fr/2019/05/17/0/0/3553/2542/800/0/75/0/74a2a9f_91ae3c37d18b44d4ae49147a7b9a2126-91ae3c37d18b44d4ae49147a7b9a2126-0.jpg',
      'https://youtube.com/shorts/Im3jww3Dr24?si=jUIR5OS0HvxnYmR0',
      'https://www.youtube.com/watch?v=jwxYoxRL8hQ',
    );
  }
  @Get()
  getExampleData(@Req() request: Request) {
    // The 'Authorization' header can be accessed here
    const authorizationHeader = request.headers.authorization;
    // const authorizationHeader = request.headers;

    console.log('auth Header : ', authorizationHeader);
    return 'App Controller';
  }
}
