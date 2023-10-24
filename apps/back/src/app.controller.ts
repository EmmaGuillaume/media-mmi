import {
  Controller,
  Logger,
  Post,
  Req,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SupabaseAuthGuard } from './auth/guard/supabase.guard';

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

  @Post('/hey')
  @UseGuards(SupabaseAuthGuard)
  createArticle(@Req() request: Request) {
    Logger.log(request.body);
    return null;
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
