import { Test, TestingModule } from '@nestjs/testing';
import { CurrentUserTasksController } from './current-user-tasks.controller';

describe('CurrentUserTasksController', () => {
  let controller: CurrentUserTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrentUserTasksController],
    }).compile();

    controller = module.get<CurrentUserTasksController>(CurrentUserTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
