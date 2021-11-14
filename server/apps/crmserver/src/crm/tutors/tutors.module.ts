import { Module } from '@nestjs/common';
import { TutorsController } from './tutors.controller';
import { TutorsService } from './tutors.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { WorkHoursService } from './work-hours/work-hours.service';
import { WorkHoursController } from './work-hours/work-hours.controller';
import CRMUser from '../../../../admin-panel/src/crmaccounts/models/CRMUser.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: CRMUser,
                schemaOptions: { collection: 'CRMAccounts' }
            }
        ])
    ],
    controllers: [TutorsController, WorkHoursController],
    providers: [TutorsService, WorkHoursService]
})
export class TutorsModule {
}
