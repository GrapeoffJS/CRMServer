import { Test, TestingModule } from '@nestjs/testing';
import { SeniorTutorController } from './senior-tutor.controller';

describe('SeniorTeacherController', () => {
  let controller: SeniorTutorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeniorTutorController],
    }).compile();

    controller = module.get<SeniorTutorController>(SeniorTutorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
