import { Test, TestingModule } from '@nestjs/testing';
import { ElasticSearchHealthIndicatorService } from './elastic-search-health-indicator.service';

describe('ElasticSearchHealthIndicatorService', () => {
  let service: ElasticSearchHealthIndicatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElasticSearchHealthIndicatorService],
    }).compile();

    service = module.get<ElasticSearchHealthIndicatorService>(ElasticSearchHealthIndicatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
