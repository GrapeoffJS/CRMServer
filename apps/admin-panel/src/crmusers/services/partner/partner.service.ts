import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Partner } from '../../models/Partner.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { CreatePartnerDTO } from '../../DTO/Partner/CreatePartnerDTO';
import { UpdatePartnerDTO } from '../../DTO/Partner/UpdatePartnerDTO';

@Injectable()
export class PartnerService {
    constructor(
        @InjectModel(Partner)
        private readonly partnerModel: ReturnModelType<typeof Partner>,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(createPartnerDTO: CreatePartnerDTO): Promise<Partner> {
        createPartnerDTO.password = await this.passwordProtector.hash(
            createPartnerDTO.password
        );

        return this.partnerModel.create(createPartnerDTO);
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: Partner[] }> {
        let count: number;

        this.partnerModel.countDocuments((err, docsCount) => {
            count = docsCount;
        });

        return {
            count,
            docs: await this.partnerModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<Partner> {
        return this.partnerModel.findById(id);
    }

    async update(
        id: string,
        updatePartnerDTO: UpdatePartnerDTO
    ): Promise<Partner> {
        const updated = this.partnerModel.findByIdAndUpdate(
            id,
            updatePartnerDTO
        );

        if (!updated) {
            throw new NotFoundException();
        }

        return this.partnerModel.findById(id);
    }

    async delete(id: string): Promise<Partner> {
        const deleted = this.partnerModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
