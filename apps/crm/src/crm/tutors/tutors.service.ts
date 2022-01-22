import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CRMUserModel } from '../../../../admin-panel/src/crmusers/models/CRMUser.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AccountTypes } from '../../../../admin-panel/src/crmusers/types/AccountTypes';
import { RoleModel } from '../../../../admin-panel/src/roles/models/Role.model';

@Injectable()
export class TutorsService {
    constructor(
        @InjectModel(CRMUserModel)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUserModel>
    ) {}

    async findAll(limit: number, offset: number, subjects: string[]) {
        let accountsCount: number;
        const subjectsPipeline = subjects
            ? { subject: { $in: subjects } }
            : undefined;

        await this.CRMUserModel.find({
            accountType: AccountTypes.Teacher,
            ...subjectsPipeline
        }).countDocuments((err, docsCount) => {
            accountsCount = docsCount;
        });

        return {
            accounts: await this.CRMUserModel.find({
                accountType: AccountTypes.Teacher,
                ...subjectsPipeline
            })
                .populate('role')
                .skip(offset || 0)
                .limit(limit || 0),
            count: accountsCount?.toString()
        };
    }

    async findById(id: string): Promise<CRMUserModel> {
        const user = await this.CRMUserModel.findOne({
            accountType: AccountTypes.Teacher,
            _id: id
        }).populate([
            {
                path: 'groups',
                select: '_id GROUP_NAME'
            },
            {
                path: 'role',
                model: RoleModel
            }
        ]);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
