import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
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
        private readonly supporterModel: ReturnModelType<typeof SupporterModel>,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(
        createSupportDTO: CreateSupporterDTO
    ): Promise<SupporterModel> {
        createSupportDTO.password = await this.passwordProtector.hash(
            createSupportDTO.password
        );

        try {
            const user = await this.supporterModel.create(CreateSupporterDTO);
            return this.supporterModel.findById(user.id);
        } catch (e) {
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: SupporterModel[] }> {
        return {
            count: await this.supporterModel.countDocuments().exec(),
            docs: await this.supporterModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<SupporterModel> {
        const found = await this.supporterModel.findById(id);

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(
        id: string,
        updateSupportDTO: UpdateSupporterDTO
    ): Promise<SupporterModel> {
        this.supporterModel.findByIdAndUpdate(id, updateSupportDTO);
        return this.supporterModel.findById(id);
    }

    async delete(id: string): Promise<SupporterModel> {
        const deleted = await this.supporterModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
