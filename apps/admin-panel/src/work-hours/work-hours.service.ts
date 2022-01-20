import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateWorkHoursDTO } from './DTO/CreateWorkHoursDTO';
import { CRMUser } from '../crmusers/models/CRMUser.model';

@Injectable()
export class WorkHoursService {
    constructor(
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>
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
