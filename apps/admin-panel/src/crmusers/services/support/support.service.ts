import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { CreateSupportDTO } from '../../DTO/Support/CreateSupportDTO';
import { UpdateSupportDTO } from '../../DTO/Support/UpdateSupportDTO';
import { Support } from '../../models/Support.model';

@Injectable()
export class SupportService {
    constructor(
        @InjectModel(Support)
        private readonly supportModel: ReturnModelType<typeof Support>,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(createSupportDTO: CreateSupportDTO): Promise<Support> {
        createSupportDTO.password = await this.passwordProtector.hash(
            createSupportDTO.password
        );

        return this.supportModel.create(createSupportDTO);
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: Support[] }> {
        let count: number;

        this.supportModel.countDocuments((err, docsCount) => {
            count = docsCount;
        });

        return {
            count,
            docs: await this.supportModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<Support> {
        return this.supportModel.findById(id);
    }

    async update(
        id: string,
        updateSupportDTO: UpdateSupportDTO
    ): Promise<Support> {
        this.supportModel.findByIdAndUpdate(id, updateSupportDTO);
        return this.supportModel.findById(id);
    }

    async delete(id: string): Promise<Support> {
        const deleted = await this.supportModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
