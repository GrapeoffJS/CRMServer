import CRMUser from './models/CRMUser.model';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { CreateCRMUserDTO } from './DTO/CreateCRMUserDTO';
import { genSalt, genSaltSync, hash, hashSync } from 'bcrypt';
import { InjectModel } from 'nestjs-typegoose';
import { Response } from 'express';
import { ReturnModelType } from '@typegoose/typegoose';
import { AccountTypes } from './models/AccountTypes';
import { UpdateCRMUserDTO } from './DTO/UpdateCRMUserDTO';
import { PopulateOptions } from 'mongoose';
import { Role } from '../roles/models/Role.model';
import { path } from '../roles/path';

@Injectable()
export class CRMAccountsService {
    constructor(
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>
    ) {}

    public async create(createUserDTO: CreateCRMUserDTO): Promise<CRMUser> {
        const candidate = {
            ...createUserDTO
        };

        const salt = await genSalt();
        const passwordHash = await hash(candidate.password, salt);

        candidate.password = passwordHash;

        try {
            return await this.CRMUserModel.create({
                ...candidate,
                role: createUserDTO.role
            });
        } catch (err) {
            throw new BadRequestException('USER_WITH_THIS_LOGIN_EXISTS');
        }
    }

    public async findAll(
        limit: number,
        offset: number,
        accountTypes: AccountTypes[],
        response: Response
    ) {
        await this.CRMUserModel.find({
            accountType: { $in: accountTypes }
        }).countDocuments(async (err, count) => {
            return response.header('Count', count.toString()).json(
                await this.CRMUserModel.find({
                    accountType: { $in: accountTypes }
                })
                    .populate('role')
                    .skip(offset || 0)
                    .limit(limit || 0)
            );
        });
    }

    public async findOne(id: string): Promise<CRMUser> {
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

    public async edit(
        id: string,
        {
            name,
            surname,
            midname,
            role,
            login,
            password,
            accountType
        }: UpdateCRMUserDTO
    ) {
        const user = await this.CRMUserModel.findById(id);

        user.name = name || user.name;
        user.surname = surname || user.surname;
        user.midname = midname || user.surname;
        user.login = login || user.login;
        user.password = password
            ? hashSync(password, genSaltSync())
            : user.password;
        user.role = role || user.role;
        user.accountType = accountType || user.accountType;

        const savedUser = await user.save();

        return await this.CRMUserModel.populate(savedUser, {
            path: 'role',
            model: Role
        } as PopulateOptions);
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
