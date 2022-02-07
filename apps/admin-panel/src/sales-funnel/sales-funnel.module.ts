import { Module } from '@nestjs/common';
import { SalesFunnelController } from './sales-funnel.controller';
import { SalesFunnelService } from './sales-funnel.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { SalesFunnelStepModel } from './models/sales-funnel-step.model';
import { StudentModel } from '../../../crm/src/crm/students/crud/models/student.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: StudentModel
            },
            {
                typegooseClass: SalesFunnelStepModel,
                schemaOptions: { collection: 'SalesFunnelSteps' }
            }
        ])
    ],
    controllers: [SalesFunnelController],
    providers: [SalesFunnelService]
})
export class SalesFunnelModule {}
