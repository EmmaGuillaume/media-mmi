import { PartialType } from '@nestjs/mapped-types';
import { CreateCrudArticleDto } from './create-article.dto';

export class UpdateCrudArticleDto extends PartialType(CreateCrudArticleDto) {}
