import { Test, TestingModule } from '@nestjs/testing';
import { PasswordProtectorService } from './password-protector.service';

describe('PasswordProtectorService', () => {
  let service: PasswordProtectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordProtectorService],
    }).compile();

    service = module.get<PasswordProtectorService>(PasswordProtectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
