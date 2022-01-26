import { Test, TestingModule } from '@nestjs/testing';
import { AllStaffController } from './all-staff.controller';

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
