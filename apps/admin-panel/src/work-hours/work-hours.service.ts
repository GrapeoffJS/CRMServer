import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { TutorModel } from '../crmusers/models/tutor.model';
import { CreateWorkHoursDto } from './dto/create-work-hours.dto';

@Injectable()
export class WorkHoursService {
    constructor(
        @InjectModel(TutorModel)
        private readonly tutorUserModel: ReturnModelType<typeof TutorModel>
    ) {}

    async create(id: string, { workHours }: CreateWorkHoursDto) {
        const teacher = await this.tutorUserModel
            .findByIdAndUpdate(id, {
                workHours
            })
            .lean()
            .exec();

        if (!teacher) {
            throw new NotFoundException();
        }

        return this.tutorUserModel.findById(id).lean().exec();
    }
}
