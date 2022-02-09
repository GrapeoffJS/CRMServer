import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { TutorModel } from '../../../../admin-panel/src/crmusers/models/tutor.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class TutorsService {
    constructor(
        @InjectModel(TutorModel)
        private readonly tutorModel: ReturnModelType<typeof TutorModel>
    ) {}

    async get() {
        return this.tutorModel.find().lean().exec();
    }
}
