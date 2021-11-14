import { Module } from '@nestjs/common';
import { WorkHoursService } from './work-hours.service';
import { WorkHoursController } from './work-hours.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Subscription } from '../subscriptions/models/Subscription.model';
import CRMUser from '../crmaccounts/models/CRMUser.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: CRMUser,
                schemaOptions: { collection: 'CRMUsers' }
            }
        ])
    ],
    providers: [WorkHoursService],
    controllers: [WorkHoursController]
})
export class WorkHoursModule {}
