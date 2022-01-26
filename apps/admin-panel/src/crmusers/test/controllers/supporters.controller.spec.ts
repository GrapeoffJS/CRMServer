import { Test, TestingModule } from '@nestjs/testing';
import { SupportersController } from '../../controllers/supporters/supporters.controller';

describe('SupportController', () => {
    let controller: SupportersController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SupportersController]
        }).compile();

        controller = module.get<SupportersController>(SupportersController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
