import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateWorkHoursDTO } from './DTO/CreateWorkHoursDTO';
import { TutorModel } from '../crmusers/models/Tutor.model';

@Injectable()
export class WorkHoursService {
    constructor(
        @InjectModel(TutorModel)
        private readonly tutorUserModel: ReturnModelType<typeof TutorModel>
    ) {}

    async create(id: string, { workHours }: CreateWorkHoursDTO) {
        const teacher = await this.tutorUserModel
            .findByIdAndUpdate(id, {
                workHours
            })
            .exec();

        if (!teacher) {
            throw new NotFoundException();
        }

        return this.tutorUserModel.findById(id).exec();
    }
}
