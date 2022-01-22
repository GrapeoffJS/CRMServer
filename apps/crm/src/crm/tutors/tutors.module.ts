import { Module } from '@nestjs/common';
import { TutorsController } from './tutors.controller';
import { TutorsService } from './tutors.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { TutorModel } from '../../../../admin-panel/src/crmusers/models/Tutor.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: TutorModel,
                schemaOptions: { collection: 'CRMUsers' }
            }
        ])
    ],
    controllers: [TutorsController],
    providers: [TutorsService]
})
export class TutorsModule {}
