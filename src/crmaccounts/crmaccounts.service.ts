import CRMUser from './models/CRMUser.model';
import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { createCRMUserDTO } from './DTO/createCRMUserDTO';
import { genSalt, hash } from 'bcrypt';
import { HTTP_ERRORS } from './constants';
import { InjectModel } from 'nestjs-typegoose';
import { Response } from 'express';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class CRMAccountsService {
    constructor(
        @InjectModel(CRMUser)
        private readonly CRMUserModel: ReturnModelType<typeof CRMUser>
    ) {}

    async create(createUserDTO: createCRMUserDTO): Promise<CRMUser> {
        const candidate = {
            ...createUserDTO
        };

        const salt = await genSalt();
        const passwordHash = await hash(candidate.password, salt);

        candidate.password = passwordHash;

        try {
            return await this.CRMUserModel.create(candidate);
        } catch (err) {
            throw new BadRequestException(
                HTTP_ERRORS.USER_WITH_SAME_LOGIN_EXISTS
            );
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

    async delete(id: string): Promise<CRMUser> {
        const user = await this.CRMUserModel.findByIdAndDelete(id).populate(
            'groups',
            '_id GROUP_NAME'
        );

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
