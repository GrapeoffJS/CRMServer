import CRMUser from './models/CRMUser.model';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { CreateCRMUserDTO } from './DTO/CreateCRMUserDTO';
import { genSalt, hash } from 'bcrypt';
import { InjectModel } from 'nestjs-typegoose';
import { Response } from 'express';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class CRMAccountsService {
    constructor(
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>
    ) {}

    async create(createUserDTO: CreateCRMUserDTO): Promise<CRMUser> {
        const candidate = {
            ...createUserDTO
        };

        const salt = await genSalt();
        const passwordHash = await hash(candidate.password, salt);

        candidate.password = passwordHash;

        try {
            return await this.CRMUserModel.create(candidate);
        } catch (err) {
            throw new BadRequestException('USER_WITH_THIS_LOGIN_EXISTS');
        }
    }

    async findAll(
        limit: number,
        offset: number,
        response: Response
    ): Promise<void> {
        if (limit > 150 || limit < 0) {
            throw new BadRequestException();
        }

        await this.CRMUserModel.find().countDocuments(async (err, count) => {
            response.header('Count', count.toString()).json(
                await this.CRMUserModel.find()
                    .populate('groups', '_id GROUP_NAME')
                    .limit(limit || 1)
                    .skip(offset || 0)
            );
        });
    }

    async findAllByRole(
        limit: number,
        offset: number,
        role: string,
        response: Response
    ) {
        if (limit > 150 || limit < 0) {
            throw new BadRequestException();
        }

        await this.CRMUserModel.find({ role }).countDocuments(
            { role },
            async (err, count) => {
                response.header('Count', count.toString()).json(
                    await this.CRMUserModel.find({ role })
                        .populate('groups', '_id GROUP_NAME')
                        .limit(limit || 1)
                        .skip(offset || 0)
                );
            }
        );
    }

    async findOne(id: string): Promise<CRMUser> {
        const user = await this.CRMUserModel.findById(id).populate(
            'groups',
            '_id GROUP_NAME'
        );

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async delete(login: string): Promise<CRMUser> {
        const user = await this.CRMUserModel.findOneAndDelete({
            login
        }).populate('groups', '_id GROUP_NAME');

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
