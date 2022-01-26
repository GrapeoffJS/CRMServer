import { Test, TestingModule } from '@nestjs/testing';
import { AllStaffService } from '../../services/all-staff/all-staff.service';

describe('AllStaffService', () => {
    let service: AllStaffService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AllStaffService]
        }).compile();

        service = module.get<AllStaffService>(AllStaffService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
