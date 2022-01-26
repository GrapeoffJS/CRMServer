import { Test, TestingModule } from '@nestjs/testing';
import { AllStaffController } from '../../controllers/all-staff/all-staff.controller';

describe('AllStaffController', () => {
    let controller: AllStaffController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AllStaffController]
        }).compile();

        controller = module.get<AllStaffController>(AllStaffController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
