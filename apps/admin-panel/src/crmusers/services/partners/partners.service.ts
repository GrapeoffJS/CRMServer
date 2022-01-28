import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PartnerModel } from '../../models/Partner.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { CreatePartnerDTO } from '../../DTO/Partner/CreatePartnerDTO';
import { UpdatePartnerDTO } from '../../DTO/Partner/UpdatePartnerDTO';

@Injectable()
export class PartnersService {
    constructor(
        @InjectModel(PartnerModel)
        private readonly partnerModel: ReturnModelType<typeof PartnerModel>,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(createPartnerDTO: CreatePartnerDTO) {
        createPartnerDTO.password = await this.passwordProtector.hash(
            createPartnerDTO.password
        );

        try {
            const user = await this.partnerModel.create(CreatePartnerDTO);
            return this.partnerModel.findById(user.id);
        } catch (e) {
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.partnerModel.countDocuments().exec(),
            docs: await this.partnerModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string) {
        const found = await this.partnerModel.findById(id);

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updatePartnerDTO: UpdatePartnerDTO) {
        const updated = this.partnerModel.findByIdAndUpdate(
            id,
            updatePartnerDTO
        );

        if (!updated) {
            throw new NotFoundException();
        }

        return this.partnerModel.findById(id);
    }

    async delete(id: string) {
        const deleted = this.partnerModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
