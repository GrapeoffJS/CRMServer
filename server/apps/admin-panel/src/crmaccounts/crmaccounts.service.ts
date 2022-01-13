import CRMUser from './models/CRMUser.model';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { CreateCRMUserDTO } from './DTO/CreateCRMUserDTO';
import { genSalt, hash } from 'bcrypt';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AccountTypes } from './models/AccountTypes';
import { UpdateCRMUserDTO } from './DTO/UpdateCRMUserDTO';
import { Role } from '../roles/models/Role.model';
import { Group } from '../../../crmserver/src/crm/groups/models/Group.model';

@Injectable()
export class CRMAccountsService {
    constructor(
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>
    ) {}

    async create(createUserDTO: CreateCRMUserDTO) {
        const salt = await genSalt();

        createUserDTO.password = await hash(createUserDTO.password, salt);

        try {
            return await this.CRMUserModel.create(createUserDTO);
        } catch (err) {
            throw new BadRequestException('USER_WITH_THIS_LOGIN_EXISTS');
        }
    }

    async findAll(limit: number, offset: number, accountTypes: AccountTypes[]) {
        let accountsCount: number;

        await this.CRMUserModel.find({
            accountType: { $in: accountTypes }
        }).countDocuments((err, docsCount) => {
            accountsCount = docsCount;
        });

        return {
            accounts: await this.CRMUserModel.find({
                accountType: { $in: accountTypes }
            })
                .populate('role')
                .skip(offset || 0)
                .limit(limit || 0),
            count: accountsCount?.toString()
        };
    }

    async findById(id: string) {
        const user = await this.CRMUserModel.findById(id).populate([
            {
                path: 'groups',
                select: '_id GROUP_NAME',
                model: Group
            },
            {
                path: 'role',
                model: Role
            }
        ]);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async edit(id: string, updateCRMUserDTO: UpdateCRMUserDTO) {
        const user = await this.CRMUserModel.findOneAndUpdate(
            { _id: id },
            updateCRMUserDTO
        );

        if (!user) throw new NotFoundException();

        return this.CRMUserModel.findById(id).populate({
            path: 'role',
            model: Role
        });
    }

    async delete(login: string) {
        const user = await this.CRMUserModel.findOneAndDelete({
            login: login
        });

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
