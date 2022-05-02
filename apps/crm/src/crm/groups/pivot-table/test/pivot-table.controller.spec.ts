import { Test, TestingModule } from '@nestjs/testing';
import { PivotTableController } from '../pivot-table.controller';

describe('PivotTableController', () => {
  let controller: PivotTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PivotTableController],
    }).compile();

    controller = module.get<PivotTableController>(PivotTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
