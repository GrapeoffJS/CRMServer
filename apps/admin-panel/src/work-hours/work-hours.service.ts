import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateWorkHoursDTO } from './DTO/CreateWorkHoursDTO';

@Injectable()
export class WorkHoursService {
    constructor(
        @InjectModel(CRMUserModel)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUserModel>
    ) {}

    async create(id: string, { workHours }: CreateWorkHoursDTO) {
        const teacher = await this.CRMUserModel.findByIdAndUpdate(id, {
            workHours
        });

        if (!teacher) {
            throw new NotFoundException();
        }

        return this.CRMUserModel.findById(id);
    }
}
