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
    return 'Hello there!';
  }

  // Create one article
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
          default_emotion: body.default_emotion,
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

  // Read all articles
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

  // Read all visible articles
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

  // Read one article
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

  // Update one article
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
          default_emotion: body.default_emotion,
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

  // Delete one article
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

  // Create one emotion
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

  // Read all emotions
  @Get('/emotions/all')
  @HttpCode(200)
  async seeAllEmotions() {
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

  // Read one emotion
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

  // Update one emotion
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

  // Delete one emotion
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

  // Create a profile vote on one article
  @Post('/profile/vote/create')
  @UseGuards(SupabaseAuthGuard)
  async createVote(@Req() req: Request) {
    const body = req.body;
    try {
      const { data, error } = await this.supabase
        .from('profile_vote_article')
        .insert({
          profile_id: body.profile_id,
          article_id: body.article_id,
          emotion_id: body.emotion_id,
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

  // Upsert a profile vote on one article
  @Post('/profile/vote/upsert')
  @UseGuards(SupabaseAuthGuard)
  async upsertVote(@Req() req: Request) {
    const body = req.body;
    try {
      const { data, error } = await this.supabase
        .from('profile_vote_article')
        .upsert({
          profile_id: body.profile_id,
          article_id: body.article_id,
          emotion_id: body.emotion_id,
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

  // Read votes on one article
  @Get('/articles/vote/:article_id')
  @HttpCode(200)
  async seeAllVotesOnArticle(
    @Param('article_id') article_id: string,
    @Req() req: Request,
  ) {
    try {
      const { data: votes, error } = await this.supabase
        .from('profile_vote_article')
        .select('*')
        .eq('article_id', article_id);
      Logger.log({ votes });
      Logger.log({ req });
      Logger.log({ error });
      return votes;
    } catch (error) {
      Logger.log(error);
      throw new HttpException('Error', 500);
    }
  }

  // Read all profile votes
  @Get('/profile/vote')
  @HttpCode(200)
  async seeProfileVotes(@Req() req: Request) {
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

  // Read profile vote on one article
  @Get('/profile/vote/:article_id')
  @HttpCode(200)
  async seeProfileVoteOnArticle(
    @Param('article_id') article_id: string,
    @Req() req: Request,
  ) {
    const body = req.body;
    const profile_id = body.profile_id;
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

  // Update profile vote on one article
  @Put('/profile/vote/update/:article_id')
  @UseGuards(SupabaseAuthGuard)
  async updateVote(
    @Param('article_id') article_id: string,
    @Req() req: Request,
  ) {
    const body = req.body;
    const profile_id = body.profile_id;
    try {
      const { data, error } = await this.supabase
        .from('profile_vote_article')
        .update({
          emotion_id: body.emotion_id,
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

  // Delete profile vote on one article
  @Delete('/profile/vote/delete/:article_id')
  @UseGuards(SupabaseAuthGuard)
  async deleteVote(
    @Param('article_id') article_id: string,
    @Req() req: Request,
  ) {
    const body = req.body;
    const profile_id = body.profile_id;
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

  // Create one user profile
  @Post('/profile/create')
  @UseGuards(SupabaseAuthGuard)
  async createProfile(@Req() req: Request) {
    const body = req.body;
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .insert({
          id: body.id,
          name: body.name,
          format: body.format,
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

  // Create one user profile
  @Post('/profile/upsert')
  @UseGuards(SupabaseAuthGuard)
  async upsertProfile(@Req() req: Request) {
    const body = req.body;
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .insert({
          id: body.id,
          name: body.name,
          format: body.format,
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

  // Read one user profile
  @Get('/profile/read')
  @HttpCode(200)
  async seeOneProfile(@Req() req: Request) {
    const body = req.body;
    const profile_id = body.profile_id;
    try {
      const { data: profile, error } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('id', profile_id);
      Logger.log({ profile });
      Logger.log({ error });
      return profile;
    } catch (error) {
      Logger.log(error);
      console.log(error);
      throw new HttpException('Error', 500);
    }
  }

  // Update one user profile
  @Put('/profile/update')
  @UseGuards(SupabaseAuthGuard)
  async updateProfile(@Req() req: Request) {
    const body = req.body;
    const profile_id = body.profile_id;
    try {
      const { data, error } = await this.supabase
        .from('profiles')
        .update({
          name: body.name,
        }) 
        .eq('id', profile_id)
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


  // MVP 3 : DO NOT USE
  // // Create one category
  // @Post('/categories/create')
  // @UseGuards(SupabaseAuthGuard)
  // async createCategory(@Req() req: Request) {
  //   const body = req.body;
  //   try {
  //     const { data, error } = await this.supabase
  //       .from('categories')
  //       .insert({
  //         name: body.name,
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

  // // Read all categories
  // @Get('/categories/all')
  // @HttpCode(200)
  // async seeAllCategories() {
  //   try {
  //     const { data: categories, error } = await this.supabase
  //       .from('categories')
  //       .select('*');
  //     Logger.log({ categories });
  //     Logger.log({ error });
  //     return categories;
  //   } catch (error) {
  //     Logger.log(error);
  //     console.log(error);
  //     throw new HttpException('Error', 500);
  //   }
  // }

  // // Read one category
  // @Get('/categories/:id')
  // @HttpCode(200)
  // async seeOneCategory(@Param('id') id: string) {
  //   try {
  //     const { data: categories, error } = await this.supabase
  //       .from('categories')
  //       .select('*')
  //       .eq('id', id);
  //     Logger.log({ categories });
  //     Logger.log({ error });
  //     return categories;
  //   } catch (error) {
  //     Logger.log(error);
  //     console.log(error);
  //     throw new HttpException('Error', 500);
  //   }
  // }

  // // Update one category
  // @Put('/categories/update/:id')
  // @UseGuards(SupabaseAuthGuard)
  // async updateCategory(@Param('id') id: string, @Req() req: Request) {
  //   const body = req.body;
  //   try {
  //     const { data, error } = await this.supabase
  //       .from('categories')
  //       .update({
  //         name: body.name,
  //       })
  //       .eq('id', id)
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

  // // Delete one category
  // @Delete('/categories/delete/:id')
  // @UseGuards(SupabaseAuthGuard)
  // async deleteCategory(@Param('id') id: string) {
  //   try {
  //     const { data, error } = await this.supabase
  //       .from('categories')
  //       .delete()
  //       .eq('id', id);
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
