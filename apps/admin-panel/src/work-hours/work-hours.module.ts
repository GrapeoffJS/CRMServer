import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { CrmUserModel } from '../crmusers/models/crm-user.model';
import { TutorModel } from '../crmusers/models/tutor.model';
import { WorkHoursController } from './work-hours.controller';
import { WorkHoursService } from './work-hours.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: CrmUserModel,
                discriminators: [TutorModel]
            }
        ])
    ],
    providers: [WorkHoursService],
    controllers: [WorkHoursController]
})
export class WorkHoursModule {}
