import { DynamicModule, Global, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';
import { createClient } from '@supabase/supabase-js';

@Global()
@Module({
  providers: [SupabaseService],
})
export class SupabaseModule {
  static initialize(url: string, key: string): DynamicModule {
    const client = createClient(url, key);
    return {
      module: SupabaseModule,
      providers: [
        {
          provide: 'SUPABASE_CLIENT',
          useValue: client,
        },
      ],
      exports: ['SUPABASE_CLIENT'],
    };
  }
}
