import { Module } from '@nestjs/common';
import { WorkHoursService } from './work-hours.service';
import { WorkHoursController } from './work-hours.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CrmUserModel } from '../crmusers/models/crm-user.model';
import { TutorModel } from '../crmusers/models/tutor.model';

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
