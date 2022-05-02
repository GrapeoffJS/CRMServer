import { Test, TestingModule } from '@nestjs/testing';
import { GroupIndexerService } from '../group-indexer.service';

describe('GroupIndexerService', () => {
  let service: GroupIndexerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupIndexerService],
    }).compile();

    service = module.get<GroupIndexerService>(GroupIndexerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
