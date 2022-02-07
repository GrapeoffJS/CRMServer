import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PartnerModel } from '../../models/partner.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { CreatePartnerDto } from '../../dto/Partner/create-partner.dto';
import { UpdatePartnerDto } from '../../dto/Partner/update-partner.dto';

@Injectable()
export class PartnersService {
    constructor(
        @InjectModel(PartnerModel)
        private readonly partnerModel: ReturnModelType<typeof PartnerModel>,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(createPartnerDto: CreatePartnerDto) {
        createPartnerDto.password = await this.passwordProtector.hash(
            createPartnerDto.password
        );

        try {
            const user = await this.partnerModel.create(CreatePartnerDto);
            return this.partnerModel.findById(user.id).exec();
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
        const found = await this.partnerModel.findById(id).exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updatePartnerDto: UpdatePartnerDto) {
        const updated = this.partnerModel
            .findByIdAndUpdate(id, updatePartnerDto)
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        return this.partnerModel.findById(id).exec();
    }

    async delete(id: string) {
        const deleted = this.partnerModel.findByIdAndDelete(id).exec();

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
