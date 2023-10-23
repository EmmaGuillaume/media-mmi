import { Injectable } from '@nestjs/common';
import { CreateCrudArticleDto } from './dto/create-article.dto';
import { UpdateCrudArticleDto } from './dto/update-article.dto';

@Injectable()
export class CrudArticleService {
  create(createCrudArticleDto: CreateCrudArticleDto) {
    console.log(createCrudArticleDto);
    return 'This action adds a new Article';
  }

  getName() {
    const a = 5;
    return `This action returns all Article #${a}`;
  }

  findOne(id: number) {
    const a = 5;
    return `This action returns a #${a} Article ${id}`;
  }

  update(id: number, updateCrudArticleDto: UpdateCrudArticleDto) {
    console.log(updateCrudArticleDto);
    return `This action updates a #${id} Article`;
  }

  remove(id: number) {
    return `This action removes a #${id} Article`;
  }
}
