import { Module } from '@nestjs/common';
import { SalesFunnelController } from './sales-funnel.controller';
import { SalesFunnelService } from './sales-funnel.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { SalesFunnelStep } from './models/SalesFunnelStep.model';
import Pupil from '../../../crmserver/src/crm/pupils/models/Pupil.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Pupil,
                schemaOptions: { collection: 'Pupils' }
            },
            {
                typegooseClass: SalesFunnelStep,
                schemaOptions: { collection: 'SalesFunnelSteps' }
            }
        ])
    ],
    controllers: [SalesFunnelController],
    providers: [SalesFunnelService]
})
export class SalesFunnelModule {
}
