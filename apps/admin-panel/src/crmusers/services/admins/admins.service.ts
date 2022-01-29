import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { AdminModel } from '../../models/Admin.model';
import { CreateAdminDTO } from '../../DTO/Admin/CreateAdminDTO';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { UpdateAdminDTO } from '../../DTO/Admin/UpdateAdminDTO';

@Injectable()
export class AdminsService {
    constructor(
        @InjectModel(AdminModel)
        private readonly adminModel: ReturnModelType<typeof AdminModel>,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(createAdminDTO: CreateAdminDTO) {
        createAdminDTO.password = await this.passwordProtector.hash(
            createAdminDTO.password
        );

        try {
            const user = await this.adminModel.create(createAdminDTO);
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

    async update(id: string, updateAdminDTO: UpdateAdminDTO) {
        const updated = await this.adminModel
            .findByIdAndUpdate(id, updateAdminDTO)
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
