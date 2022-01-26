import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async create(createAdminDTO: CreateAdminDTO): Promise<AdminModel> {
        createAdminDTO.password = await this.passwordProtector.hash(
            createAdminDTO.password
        );

        try {
            const user = await this.adminModel.create(createAdminDTO);
            return this.adminModel.findById(user.id);
        } catch (e) {
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: AdminModel[] }> {
        return {
            count: await this.adminModel.countDocuments().exec(),
            docs: await this.adminModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<AdminModel> {
        const found = await this.adminModel.findById(id);

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(
        id: string,
        updateAdminDTO: UpdateAdminDTO
    ): Promise<AdminModel> {
        const updated = await this.adminModel.findByIdAndUpdate(
            id,
            updateAdminDTO
        );

        if (!updated) {
            throw new NotFoundException();
        }

        return this.adminModel.findById(id);
    }

    async delete(id: string): Promise<AdminModel> {
        const deleted = await this.adminModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
