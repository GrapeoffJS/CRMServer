import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { CrmUserModel } from '../../models/crm-user.model';

@Injectable()
export class AllStaffService {
    constructor(
        @InjectModel(CrmUserModel)
        private readonly crmUserModel: ReturnModelType<typeof CrmUserModel>
    ) {}

    async get(limit: number, offset: number) {
        return {
            count: await this.crmUserModel.countDocuments().lean().exec(),
            docs: await this.crmUserModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string) {
        const found = await this.crmUserModel.findById(id).lean().exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async delete(id: string) {
        const deleted = await this.crmUserModel
            .findByIdAndDelete(id)
            .lean()
            .exec();

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
