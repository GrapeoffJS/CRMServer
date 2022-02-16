import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateWorkHoursDto } from './dto/create-work-hours.dto';
import { TutorModel } from '../crmusers/models/tutor.model';

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
