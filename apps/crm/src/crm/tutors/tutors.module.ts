import { Module } from '@nestjs/common';
import { TutorsService } from './tutors.service';
import { TutorsController } from './tutors.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CrmUserModel } from '../../../../admin-panel/src/crmusers/models/crm-user.model';
import { TutorModel } from '../../../../admin-panel/src/crmusers/models/tutor.model';

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
