import { CrmUserModel } from '@apps/admin-panel/crmusers/models/crm-user.model';
import { TutorModel } from '@apps/admin-panel/crmusers/models/tutor.model';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { TutorsController } from './tutors.controller';
import { TutorsService } from './tutors.service';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: CrmUserModel,
                discriminators: [TutorModel]
            }
        ])
    ],
    providers: [TutorsService],
    controllers: [TutorsController]
})
export class TutorsModule {}
