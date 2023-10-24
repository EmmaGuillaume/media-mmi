import { Inject, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Logger } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
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
  // async getLastArticle() {
  //   try {
  //     const { data, error } = await this.supabase
  //       .from('articles')
  //       .select()
  //       .order('id', { ascending: false })
  //       .limit(1);
  //     console.log(data);
  //     console.log(error);
  //     return data;
  //   } catch (error) {
  //     Logger.log(error);
  //     console.log(error);
  //     return error;
  //   }
  // }
}
