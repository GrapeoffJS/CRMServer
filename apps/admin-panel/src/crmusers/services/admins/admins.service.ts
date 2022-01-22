import { Injectable, NotFoundException } from '@nestjs/common';
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

        return this.adminModel.create(createAdminDTO);
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: AdminModel[] }> {
        let count: number;

        this.adminModel.countDocuments((err, docsCount) => {
            count = docsCount;
        });

        return {
            count,
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
        this.adminModel.findByIdAndUpdate(id, updateAdminDTO);
        return this.adminModel.findById(id);
    }

    async delete(id: string): Promise<AdminModel> {
        return this.adminModel.findByIdAndDelete(id);
    }
}
