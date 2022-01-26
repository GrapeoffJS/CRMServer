import { Test, TestingModule } from '@nestjs/testing';
import { ManagersController } from './managers.controller';

describe('ManagerController', () => {
    let controller: ManagersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ManagersController]
        }).compile();

        controller = module.get<ManagersController>(ManagersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
