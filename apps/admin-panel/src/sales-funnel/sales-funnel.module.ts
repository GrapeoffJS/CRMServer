import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { StudentModel } from '../../../crm/src/crm/students/crud/models/student.model';
import { SalesFunnelStepModel } from './models/sales-funnel-step.model';
import { SalesFunnelController } from './sales-funnel.controller';
import { SalesFunnelService } from './sales-funnel.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: StudentModel
            },
            {
                typegooseClass: SalesFunnelStepModel
            }
        ])
    ],
    controllers: [SalesFunnelController],
    providers: [SalesFunnelService]
})
export class SalesFunnelModule {}
