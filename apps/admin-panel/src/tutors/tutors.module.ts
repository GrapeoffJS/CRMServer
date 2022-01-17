import { Module } from '@nestjs/common';
import { TutorsController } from './tutors.controller';
import { TutorsService } from './tutors.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Tutor } from './models/Tutor.model';

@Module({
    imports: [
        TypegooseModule.forFeature([
            {
                typegooseClass: Tutor
            }
        ])
    ],
    controllers: [TutorsController],
    providers: [TutorsService]
})
export class TutorsModule {}
