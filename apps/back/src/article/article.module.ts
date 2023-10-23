import { Module } from '@nestjs/common';
import { CrudArticleService } from './article.service';
import { CrudArticleController } from './article.controller';

@Module({
  controllers: [CrudArticleController],
  providers: [CrudArticleService],
})
export class CrudArticleModule {}
