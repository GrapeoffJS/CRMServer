import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { CreateSupporterDTO } from '../../DTO/Supporter/CreateSupporterDTO';
import { UpdateSupporterDTO } from '../../DTO/Supporter/UpdateSupporterDTO';
import { SupporterModel } from '../../models/Supporter.model';

@Injectable()
export class SupportersService {
    constructor(
        @InjectModel(SupporterModel)
        private readonly supportModel: ReturnModelType<typeof SupporterModel>,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(
        createSupportDTO: CreateSupporterDTO
    ): Promise<SupporterModel> {
        createSupportDTO.password = await this.passwordProtector.hash(
            createSupportDTO.password
        );

        return this.supportModel.create(createSupportDTO);
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: SupporterModel[] }> {
        let count: number;

        this.supportModel.countDocuments((err, docsCount) => {
            count = docsCount;
        });

        return {
            count,
            docs: await this.supportModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<SupporterModel> {
        return this.supportModel.findById(id);
    }

    async update(
        id: string,
        updateSupportDTO: UpdateSupporterDTO
    ): Promise<SupporterModel> {
        this.supportModel.findByIdAndUpdate(id, updateSupportDTO);
        return this.supportModel.findById(id);
    }

    async delete(id: string): Promise<SupporterModel> {
        const deleted = await this.supportModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
