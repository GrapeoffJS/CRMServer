import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { CRMUser } from '../../models/CRMUser.model';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class AllStaffService {
    constructor(
        @InjectModel(CRMUser)
        private readonly crmUserModel: ReturnModelType<typeof CRMUser>
    ) {}

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: CRMUser[] }> {
        let count: number;

        this.crmUserModel.countDocuments((err, docsCount) => {
            count = docsCount;
        });

        return {
            count,
            docs: await this.crmUserModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<CRMUser> {
        const found = await this.crmUserModel.findById(id);

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async delete(id: string): Promise<CRMUser> {
        const deleted = await this.crmUserModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
