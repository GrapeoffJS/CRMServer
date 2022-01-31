import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AdminModel } from '../../models/Admin.model';
import { CreateAdminDto } from '../../dto/Admin/CreateAdminDto';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { UpdateAdminDto } from '../../dto/Admin/UpdateAdminDto';

@Injectable()
export class AdminsService {
    constructor(
        @InjectModel(AdminModel)
        private readonly adminModel: ReturnModelType<typeof AdminModel>,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(createAdminDto: CreateAdminDto) {
        createAdminDto.password = await this.passwordProtector.hash(
            createAdminDto.password
        );

        try {
            const user = await this.adminModel.create(createAdminDto);
            return this.adminModel.findById(user.id).exec();
        } catch (e) {
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.adminModel.countDocuments().exec(),
            docs: await this.adminModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string) {
        const found = await this.adminModel.findById(id).exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateAdminDto: UpdateAdminDto) {
        const updated = await this.adminModel
            .findByIdAndUpdate(id, updateAdminDto)
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        return this.adminModel.findById(id).exec();
    }

    async delete(id: string) {
        const deleted = await this.adminModel.findByIdAndDelete(id).exec();

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
