import { Test, TestingModule } from '@nestjs/testing';
import { PartnersService } from '../../services/partners/partners.service';

describe('PartnerService', () => {
    let service: PartnersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PartnersService]
        }).compile();

        service = module.get<PartnersService>(PartnersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
