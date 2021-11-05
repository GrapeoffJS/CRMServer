import { Test, TestingModule } from '@nestjs/testing';
import { TaskTagsController } from './task-tags.controller';

describe('TaskTagsController', () => {
  let controller: TaskTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskTagsController],
    }).compile();

    controller = module.get<TaskTagsController>(TaskTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
