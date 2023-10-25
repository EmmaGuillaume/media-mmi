import {
  Controller,
  Get,
  Put,
  Delete,
  HttpCode,
  HttpException,
  Inject,
  Logger,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  Param,
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

  @Get()
  getHello(): string {
    return 'eus';
  }

  @Post('/articles/create')
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
          visibility: body.is_visible,
          nb_positif: body.nb_positif,
          nb_etonnant: body.nb_etonnant,
          nb_angoissant: body.nb_angoissant,
          nb_enervant: body.nb_enervant,
          nb_triste: body.nb_triste,
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

  @Get('/articles/all')
  // @UseGuards(SupabaseAuthGuard)
  @HttpCode(200)
  async seeAllArticles() {
    try {
      const { data: articles, error } = await this.supabase
        .from('articles')
        .select('*');
      Logger.log({ articles });
      Logger.log({ error });
      return articles;
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Get('/articles/visible')
  @HttpCode(200)
  async seeVisibleArticles() {
    try {
      const { data: articles, error } = await this.supabase
        .from('articles')
        .select('*')
        .is('visibility', true);
      Logger.log({ articles });
      Logger.log({ error });
      return articles;
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Get('/articles/:id')
  @HttpCode(200)
  async seeOneArticle(@Param('id') id: string) {
    try {
      const { data: articles, error } = await this.supabase
        .from('articles')
        .select('*')
        .eq('id', id);
      Logger.log({ articles });
      Logger.log({ error });
      return articles;
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Put('/articles/update/:id')
  @UseGuards(SupabaseAuthGuard)
  async updateArticle(@Param('id') id: string, @Req() req: Request) {
    const body = req.body;
    try {
      const { data, error } = await this.supabase
        .from('articles')
        .update({
          title: body.title,
          content: body.content,
          introduction: body.introduction,
          image: body.image,
          short_video: body.short_video,
          long_video: body.long_video,
          visibility: body.is_visible,
          nb_positif: body.nb_positif,
          nb_etonnant: body.nb_etonnant,
          nb_angoissant: body.nb_angoissant,
          nb_enervant: body.nb_enervant,
          nb_triste: body.nb_triste,
        }) 
        .eq('id', id)
        .select();
      Logger.log({ data });
      Logger.log({ error });
      return {
        ok: true,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Delete('/articles/delete/:id')
  @UseGuards(SupabaseAuthGuard)
  async deleteArticle(@Param('id') id: string) {
    try {
      const { data, error } = await this.supabase
        .from('articles')
        .delete() 
        .eq('id', id);
      Logger.log({ data });
      Logger.log({ error });
      return {
        ok: true,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Post('/vote/create')
  @UseGuards(SupabaseAuthGuard)
  async createVote(@Req() req: Request) {
    const body = req.body;
    try {
      const { data, error } = await this.supabase
        .from('profile_vote_article')
        .insert({
          profile_id: body.profile_id,
          article_id: body.article_id,
          is_positif: body.is_positif,
          is_etonnant: body.is_etonnant,
          is_angoissant: body.is_angoissant,
          is_enervant: body.is_enervant,
          is_triste: body.is_triste,
        })
        .select();
      Logger.log({ data });
      Logger.log({ error });
      return {
        ok: true,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Get('/vote/one-article')
  @HttpCode(200)
  async seeOneVote(@Req() req: Request) {
    const body = req.body;
    const profile_id = body.profile_id;
    const article_id = body.article_id;
    try {
      const { data: votes, error } = await this.supabase
        .from('profile_vote_article')
        .select('*')
        .eq('profile_id', profile_id)
        .eq('article_id', article_id);
      Logger.log({ votes });
      Logger.log({ error });
      return votes;
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Get('/vote/all-articles')
  @HttpCode(200)
  async seeAllVotes(@Req() req: Request) {
    const body = req.body;
    const profile_id = body.profile_id;
    try {
      const { data: votes, error } = await this.supabase
        .from('profile_vote_article')
        .select('*')
        .eq('profile_id', profile_id);
      Logger.log({ votes });
      Logger.log({ error });
      return votes;
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Put('/vote/update')
  @UseGuards(SupabaseAuthGuard)
  async updateVote(@Req() req: Request) {
    const body = req.body;
    const profile_id = body.profile_id;
    const article_id = body.article_id;
    try {
      const { data, error } = await this.supabase
        .from('profile_vote_article')
        .update({
          is_positif: body.is_positif,
          is_etonnant: body.is_etonnant,
          is_angoissant: body.is_angoissant,
          is_enervant: body.is_enervant,
          is_triste: body.is_triste,
        }) 
        .eq('profile_id', profile_id)
        .eq('article_id', article_id)
        .select();
      Logger.log({ data });
      Logger.log({ error });
      return {
        ok: true,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Delete('/vote/delete')
  @UseGuards(SupabaseAuthGuard)
  async deleteVote(@Req() req: Request) {
    const body = req.body;
    const profile_id = body.profile_id;
    const article_id = body.article_id;
    try {
      const { data, error } = await this.supabase
        .from('profile_vote_article')
        .delete() 
        .eq('profile_id', profile_id)
        .eq('article_id', article_id);
      Logger.log({ data });
      Logger.log({ error });
      return {
        ok: true,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Post('/categories/create')
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
      throw new HttpException('Error', 500);
    }
  }

  @Get('/categories/all')
  @HttpCode(200)
  async seeAllCategories() {
    try {
      const { data: categories, error } = await this.supabase
        .from('categories')
        .select('*');
      Logger.log({ categories });
      Logger.log({ error });
      return categories;
    } catch (error) {
      Logger.log(error);
      console.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Get('/categories/:id')
  @HttpCode(200)
  async seeOneCategory(@Param('id') id: string) {
    try {
      const { data: categories, error } = await this.supabase
        .from('categories')
        .select('*')
        .eq('id', id);
      Logger.log({ categories });
      Logger.log({ error });
      return categories;
    } catch (error) {
      Logger.log(error);
      console.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Put('/categories/update/:id')
  @UseGuards(SupabaseAuthGuard)
  async updateCategory(@Param('id') id: string, @Req() req: Request) {
    const body = req.body;
    try {
      const { data, error } = await this.supabase
        .from('categories')
        .update({
          name: body.name,
        }) 
        .eq('id', id)
        .select();
      Logger.log({ data });
      Logger.log({ error });
      return {
        ok: true,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Delete('/categories/delete/:id')
  @UseGuards(SupabaseAuthGuard)
  async deleteCategory(@Param('id') id: string) {
    try {
      const { data, error } = await this.supabase
        .from('categories')
        .delete() 
        .eq('id', id);
      Logger.log({ data });
      Logger.log({ error });
      return {
        ok: true,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  // @Post('/article-categories/create')
  // @UseGuards(SupabaseAuthGuard)
  // async createArticleCategoryJoint(@Req() req: Request) {
  //   const body = req.body;
  //   try {
  //     const { data, error } = await this.supabase
  //       .from('categories')
  //       .insert({
  //         category_id: body.category_id,
  //         article_id: body.article_id,
  //       })
  //       .select();
  //     Logger.log({ data });
  //     Logger.log({ error });
  //     return {
  //       ok: true,
  //     };
  //   } catch (error) {
  //     Logger.log(error);
  //     throw new HttpException('Error', 500);
  //   }
  // }

  //MVP 3
  @Post('/emotions/create')
  @UseGuards(SupabaseAuthGuard)
  @HttpCode(200)
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
      throw new HttpException('Error', 500);
    }
  }

  @Get('/emotions/all')
  @HttpCode(200)
  async seeAllEmotions() {
    // const body = req.body;
    try {
      const { data: emotions, error } = await this.supabase
        .from('emotions')
        .select('*');
      Logger.log({ emotions });
      Logger.log({ error });
      return emotions;
    } catch (error) {
      Logger.log(error);
      console.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Get('/emotions/:id')
  @HttpCode(200)
  async seeOneEmotion(@Param('id') id: string) {
    try {
      const { data: emotions, error } = await this.supabase
        .from('emotions')
        .select('*')
        .eq('id', id);
      Logger.log({ emotions });
      Logger.log({ error });
      return emotions;
    } catch (error) {
      Logger.log(error);
      console.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Put('/emotions/update/:id')
  @UseGuards(SupabaseAuthGuard)
  async updateEmotion(@Param('id') id: string, @Req() req: Request) {
    const body = req.body;
    try {
      const { data, error } = await this.supabase
        .from('emotions')
        .update({
          name: body.name,
        }) 
        .eq('id', id)
        .select();
      Logger.log({ data });
      Logger.log({ error });
      return {
        ok: true,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Delete('/emotions/delete/:id')
  @UseGuards(SupabaseAuthGuard)
  async deleteEmotion(@Param('id') id: string) {
    try {
      const { data, error } = await this.supabase
        .from('emotions')
        .delete() 
        .eq('id', id);
      Logger.log({ data });
      Logger.log({ error });
      return {
        ok: true,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  @Get('/user')
  @HttpCode(200)
  getExampleData(@Req() request: Request) {
    // The 'Authorization' header can be accessed here
    const authorizationHeader = request.headers.authorization;
    // const authorizationHeader = request.headers;

    console.log('auth Header : ', authorizationHeader);
    return 'App Controller';
  }
}
