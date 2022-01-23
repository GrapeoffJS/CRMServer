import { Module } from '@nestjs/common';
import { WorkHoursService } from './work-hours.service';
import { WorkHoursController } from './work-hours.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CRMUserModel } from '../crmusers/models/CRMUser.model';
import { TutorModel } from '../crmusers/models/Tutor.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: CRMUserModel,
                discriminators: [TutorModel]
            }
        ])
    ],
    providers: [WorkHoursService],
    controllers: [WorkHoursController]
})
export class WorkHoursModule {}
