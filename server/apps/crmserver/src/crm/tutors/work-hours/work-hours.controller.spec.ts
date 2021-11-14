import { Test, TestingModule } from '@nestjs/testing';
import { WorkHoursController } from './work-hours.controller';

describe('WorkHoursController', () => {
  let controller: WorkHoursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkHoursController],
    }).compile();

    controller = module.get<WorkHoursController>(WorkHoursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
