import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import CRMUser from '../../../../../admin-panel/src/crmaccounts/models/CRMUser.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateWorkHoursDTO } from './DTO/CreateWorkHoursDTO';

@Injectable()
export class WorkHoursService {
    constructor(
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>
    ) {}

    public async create(id: string, { workHours }: CreateWorkHoursDTO) {
        const teacher = await this.CRMUserModel.findByIdAndUpdate(id, {
            workHours
        });

        if (!teacher) {
            throw new NotFoundException();
        }

        return teacher;
    }
}
