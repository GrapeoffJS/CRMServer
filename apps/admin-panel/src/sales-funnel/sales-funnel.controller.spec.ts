import { Test, TestingModule } from '@nestjs/testing';
import { TypegooseModule } from 'nestjs-typegoose';
import { SalesFunnelService } from './sales-funnel.service';
import { SalesFunnelController } from './sales-funnel.controller';
import { SalesFunnelStep } from './models/SalesFunnelStep.model';
import { random } from 'faker/locale/ru';
import Pupil from '../../../crmserver/src/crm/pupils/models/Pupil.model';

describe('SalesFunnel', () => {
    let service: SalesFunnelService;
    let controller: SalesFunnelController;

    let mockStep;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypegooseModule.forRoot(),
                TypegooseModule.forFeature([
                    {
                        typegooseClass: SalesFunnelStep,
                        schemaOptions: { collection: 'SalesFunnelSteps' }
                    },
                    {
                        typegooseClass: Pupil,
                        schemaOptions: { collection: 'Pupils' }
                    }
                ])
            ],
            controllers: [SalesFunnelController],
            providers: [SalesFunnelService]
        }).compile();

        service = module.get<SalesFunnelService>(SalesFunnelService);
        controller = module.get<SalesFunnelController>(SalesFunnelController);
    });

    it('Controller should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('Service should be defined', () => {
        expect(service).toBeDefined();
    });

    it('Should create a sales funnel step', async () => {
        const step = await controller.create({
            background: '#FFFFFF',
            color: '#FFFFFF',
            name: random.word(),
            order: 10
        });

        expect(step).toBeDefined();
        expect(step).toHaveProperty('background');
        expect(step).toHaveProperty('color');
        expect(step).toHaveProperty('name');
        expect(step).toHaveProperty('order');
        expect(step.order).toBe(10);
        expect(step.background).toBe('#FFFFFF');
        expect(step.color).toBe('#FFFFFF');

        mockStep = step;
    });
});
