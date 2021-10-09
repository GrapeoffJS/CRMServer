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

@Injectable()
export class CRMAccountsService {
    constructor(
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>
    ) {}

    public async create(createUserDTO: CreateCRMUserDTO): Promise<CRMUser> {
        if (
            createUserDTO.role &&
            (createUserDTO.localActionPermissions ||
                createUserDTO.localDataPermissions)
        ) {
            throw new BadRequestException();
        } else if (
            !createUserDTO.role &&
            !(
                createUserDTO.localActionPermissions ||
                createUserDTO.localDataPermissions
            )
        ) {
            throw new BadRequestException();
        }

        const salt = await genSalt();

        createUserDTO.password = await hash(createUserDTO.password, salt);

        try {
            return await this.CRMUserModel.create(createUserDTO);
        } catch (err) {
            throw new BadRequestException('USER_WITH_THIS_LOGIN_EXISTS');
        }
    }

    public async findAll(
        limit: number,
        offset: number,
        accountTypes: AccountTypes[]
    ) {
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

    public async findById(id: string): Promise<CRMUser> {
        const user = await this.CRMUserModel.findById(id).populate([
            {
                path: 'groups',
                select: '_id GROUP_NAME'
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

    public async edit(id: string, updateCRMUserDTO: UpdateCRMUserDTO) {
        if (
            updateCRMUserDTO.role &&
            (updateCRMUserDTO.localActionPermissions ||
                updateCRMUserDTO.localDataPermissions)
        ) {
            throw new BadRequestException();
        }

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

    public async delete(login: string): Promise<CRMUser> {
        const user = await this.CRMUserModel.findOneAndDelete({
            login: login
        }).populate('groups', '_id GROUP_NAME');

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
