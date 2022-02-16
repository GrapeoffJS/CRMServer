import { Test, TestingModule } from '@nestjs/testing';
import { CrmUsersIndexerService } from '../crm-users-indexer.service';

describe('CrmUsersIndexerService', () => {
  let service: CrmUsersIndexerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrmUsersIndexerService],
    }).compile();

    service = module.get<CrmUsersIndexerService>(CrmUsersIndexerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
