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
import { UpdateCRMUserDTO } from './DTO/UpdateCRMUserDTO';

@Injectable()
export class CRMAccountsService {
    constructor(
        @InjectModel(CRMUser)
        private readonly crmUserModel: ReturnModelType<typeof CRMUser>
    ) {}

    async create(createUserDTO: CreateCRMUserDTO) {
        const salt = await genSalt();
        createUserDTO.password = await hash(createUserDTO.password, salt);

        try {
            return await this.crmUserModel.create(createUserDTO);
        } catch (err) {
            throw new BadRequestException('USER_WITH_THIS_LOGIN_EXISTS');
        }
    }

    async get(limit: number, offset: number) {
        let count: number;

        await this.crmUserModel.find().countDocuments((err, docsCount) => {
            count = docsCount;
        });

        return {
            accounts: await this.crmUserModel
                .find()
                .populate('role')
                .skip(offset)
                .limit(limit),
            count
        };
    }

    async getByID(id: string) {
        const user = await this.crmUserModel.findById(id).populate('role');

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async update(id: string, updateCRMUserDTO: UpdateCRMUserDTO) {
        const user = await this.crmUserModel.findOneAndUpdate(
            { _id: id },
            updateCRMUserDTO
        );

        if (!user) throw new NotFoundException();

        return this.crmUserModel.findById(id).populate('role');
    }

    async delete(id: string) {
        const user = await this.crmUserModel.findByIdAndDelete(id);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }
}
