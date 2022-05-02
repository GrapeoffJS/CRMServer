import { Test, TestingModule } from '@nestjs/testing';
import { ManagersService } from '../../services/managers/managers.service';

describe('ManagerService', () => {
    let service: ManagersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ManagersService]
        }).compile();

        service = module.get<ManagersService>(ManagersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
