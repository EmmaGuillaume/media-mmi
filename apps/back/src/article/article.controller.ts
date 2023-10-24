import {
  Controller,
  Get,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { CrudArticleService } from './article.service';
// import { CreateCrudArticleDto } from './dto/create-article.dto';
// import { UpdateCrudArticleDto } from './dto/update-article.dto';

@Controller('article')
export class CrudArticleController {
  constructor(private readonly crudArticleService: CrudArticleService) {}

  // @Post()
  // create(@Body() createCrudArticleDto: CreateCrudArticleDto) {
  //   return this.crudArticleService.create(createCrudArticleDto);
  // }

  @Get()
  getName() {
    return this.crudArticleService.getName();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.crudArticleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCrudArticleDto: UpdateCrudArticleDto,
  // ) {
  //   return this.crudArticleService.update(+id, updateCrudArticleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.crudArticleService.remove(+id);
  // }
}
