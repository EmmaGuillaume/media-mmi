import { Test, TestingModule } from '@nestjs/testing';
import { CrudArticleService } from './article.service';

describe('CrudArticleService', () => {
  let service: CrudArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrudArticleService],
    }).compile();

    service = module.get<CrudArticleService>(CrudArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
