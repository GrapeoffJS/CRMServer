import { Test, TestingModule } from '@nestjs/testing';
import { SupportersService } from '../../services/supporters/supporters.service';

describe('SupportService', () => {
    let service: SupportersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SupportersService]
        }).compile();

        service = module.get<SupportersService>(SupportersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
