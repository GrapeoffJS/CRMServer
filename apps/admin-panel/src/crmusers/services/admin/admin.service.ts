import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Admin } from '../../models/Admin.model';
import { CreateAdminDTO } from '../../DTO/Admin/CreateAdminDTO';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { UpdateAdminDTO } from '../../DTO/Admin/UpdateAdminDTO';

@Injectable()
export class AdminService {
    constructor(
        @InjectModel(Admin)
        private readonly adminModel: ReturnModelType<typeof Admin>,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(createAdminDTO: CreateAdminDTO): Promise<Admin> {
        createAdminDTO.password = await this.passwordProtector.hash(
            createAdminDTO.password
        );

        return this.adminModel.create(createAdminDTO);
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: Admin[] }> {
        let count: number;

        this.adminModel.countDocuments((err, docsCount) => {
            count = docsCount;
        });

        return {
            count,
            docs: await this.adminModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<Admin> {
        return this.adminModel.findById(id);
    }

    async update(id: string, updateAdminDTO: UpdateAdminDTO): Promise<Admin> {
        this.adminModel.findByIdAndUpdate(id, updateAdminDTO);
        return this.adminModel.findById(id);
    }

    async delete(id: string): Promise<Admin> {
        return this.adminModel.findByIdAndDelete(id);
    }
}
