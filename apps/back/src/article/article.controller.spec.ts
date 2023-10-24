import { Test, TestingModule } from '@nestjs/testing';
import { CrudArticleController } from './article.controller';
import { CrudArticleService } from './article.service';

describe('CrudArticleController', () => {
  let controller: CrudArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrudArticleController],
      providers: [CrudArticleService],
    }).compile();

    controller = module.get<CrudArticleController>(CrudArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
