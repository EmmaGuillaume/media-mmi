import {
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Request } from 'express';
import { AppService } from './app.service';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SupabaseAuthGuard } from './auth/guard/supabase.guard';

@Controller()
@UseInterceptors(AuthInterceptor)
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('SUPABASE_CLIENT')
    private supabase: SupabaseClient,
  ) {}

  @Post('/create-article')
  @UseGuards(SupabaseAuthGuard)
  async createArticle(@Req() req: Request) {
    const body = req.body;
    try {
      const { data, error } = await this.supabase
        .from('articles')
        .insert({
          title: body.title,
          content: body.content,
          introduction: body.introduction,
          image: body.image,
          short_video: body.short_video,
          long_video: body.long_video,
        })
        .select();
      Logger.log({ data });
      Logger.log({ error });
      return {
        ok: true,
      };
    } catch (error) {
      Logger.log(error);
      console.log(error);
      return error;
    }
  }

  @Get('/all-articles')
  @UseGuards(SupabaseAuthGuard)
  async seeAllArticles(@Req() req: Request) {
    // const body = req.body;
    try {
      const { data: articles, error } = await this.supabase
        .from('articles')
        .select('*');
      Logger.log({ articles });
      Logger.log({ error });
      Logger.log({ req });
    } catch (error) {
      Logger.log(error);
      console.log(error);
      return error;
    }
  }

  @Get('/visible-articles')
  async seeVisibleArticles(@Req() req: Request) {
    // const body = req.body;
    try {
      const { data: articles, error } = await this.supabase
        .from('articles')
        .select('*')
        .is('visibility', true);
      Logger.log({ articles });
      Logger.log({ error });
      Logger.log({ req });
    } catch (error) {
      Logger.log(error);
      console.log(error);
      return error;
    }
  }

  @Post('/create-category')
  @UseGuards(SupabaseAuthGuard)
  async createCategory(@Req() req: Request) {
    const body = req.body;
    try {
      const { data, error } = await this.supabase
        .from('categories')
        .insert({
          name: body.name,
        })
        .select();
      Logger.log({ data });
      Logger.log({ error });
      return {
        ok: true,
      };
    } catch (error) {
      Logger.log(error);
      console.log(error);
      return error;
    }
  }

  @Get('/all-categories')
  async seeAllCategories(@Req() req: Request) {
    // const body = req.body;
    try {
      const { data: categories, error } = await this.supabase
        .from('categories')
        .select('*');
      Logger.log({ categories });
      Logger.log({ error });
      Logger.log({ req });
    } catch (error) {
      Logger.log(error);
      console.log(error);
      return error;
    }
  }

  @Post('/create-emotion')
  @UseGuards(SupabaseAuthGuard)
  async createEmotion(@Req() req: Request) {
    const body = req.body;
    try {
      const { data, error } = await this.supabase
        .from('emotions')
        .insert({
          name: body.name,
        })
        .select();
      Logger.log({ data });
      Logger.log({ error });
      return {
        ok: true,
      };
    } catch (error) {
      Logger.log(error);
      console.log(error);
      return error;
    }
  }

  @Get('/all-emotions')
  async seeAllEmotions(@Req() req: Request) {
    // const body = req.body;
    try {
      const { data: emotions, error } = await this.supabase
        .from('emotions')
        .select('*');
      Logger.log({ emotions });
      Logger.log({ error });
      Logger.log({ req });
    } catch (error) {
      Logger.log(error);
      console.log(error);
      return error;
    }
  }

  @Get('/user')
  getExampleData(@Req() request: Request) {
    // The 'Authorization' header can be accessed here
    const authorizationHeader = request.headers.authorization;
    // const authorizationHeader = request.headers;

    console.log('auth Header : ', authorizationHeader);
    return 'App Controller';
  }
}
