import { Module } from '@nestjs/common';
import { CrudArticleService } from './article.service';
import { CrudArticleController } from './article.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { SupabaseModule } from '../supabase/supabase.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SupabaseModule.initialize(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
    ),
    AuthModule,
  ],
  controllers: [CrudArticleController],
  providers: [CrudArticleService],
})
export class CrudArticleModule {}
