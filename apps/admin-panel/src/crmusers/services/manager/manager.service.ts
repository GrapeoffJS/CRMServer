import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { Manager } from '../../models/Manager.model';
import { UpdateManagerDTO } from '../../DTO/Manager/UpdateManagerDTO';
import { CreateManagerDTO } from '../../DTO/Manager/CreateManagerDTO';

@Injectable()
export class ManagerService {
    constructor(
        @InjectModel(Manager)
        private readonly managerModel: ReturnModelType<typeof Manager>,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(createAdminDTO: CreateManagerDTO): Promise<Manager> {
        createAdminDTO.password = await this.passwordProtector.hash(
            createAdminDTO.password
        );

        return this.managerModel.create(createAdminDTO);
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: Manager[] }> {
        let count: number;

        this.managerModel.countDocuments((err, docsCount) => {
            count = docsCount;
        });

        return {
            count,
            docs: await this.managerModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<Manager> {
        return this.managerModel.findById(id);
    }

    async update(
        id: string,
        updateManagerDTO: UpdateManagerDTO
    ): Promise<Manager> {
        const updated = this.managerModel.findByIdAndUpdate(
            id,
            updateManagerDTO
        );

        if (!updated) {
            throw new NotFoundException();
        }

        return this.managerModel.findById(id);
    }

    async delete(id: string): Promise<Manager> {
        const deleted = this.managerModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
