import { Test, TestingModule } from '@nestjs/testing';
import { SeniorTutorsController } from '../../controllers/senior-teachers/senior-tutors.controller';

describe('SeniorTeacherController', () => {
    let controller: SeniorTutorsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SeniorTutorsController]
        }).compile();

        controller = module.get<SeniorTutorsController>(SeniorTutorsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
