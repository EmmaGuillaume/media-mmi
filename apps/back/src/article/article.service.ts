import { Injectable, Inject } from '@nestjs/common';
// import { CreateCrudArticleDto } from './dto/create-article.dto';
// import { UpdateCrudArticleDto } from './dto/update-article.dto';
import { SupabaseClient } from '@supabase/supabase-js';
import { Logger } from '@nestjs/common';

@Injectable()
export class CrudArticleService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private supabase: SupabaseClient,
  ) {}

  async getName() {
    try {
      const { data, error } = await this.supabase.from('emotions').select();
      console.log(data);
      console.log(error);
      return data;
    } catch (error) {
      Logger.log(error);
      console.log(error);
      return 'ERror';
    }
  }
}
