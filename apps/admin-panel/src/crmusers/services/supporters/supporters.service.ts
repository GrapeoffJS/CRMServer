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

    async create(createSupportDTO: CreateSupporterDTO) {
        createSupportDTO.password = await this.passwordProtector.hash(
            createSupportDTO.password
        );

        try {
            const user = await this.supporterModel.create(CreateSupporterDTO);
            return this.supporterModel.findById(user.id).exec();
        } catch (e) {
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.supporterModel.countDocuments().exec(),
            docs: await this.supporterModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string) {
        const found = await this.supporterModel.findById(id).exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateSupportDTO: UpdateSupporterDTO) {
        this.supporterModel.findByIdAndUpdate(id, updateSupportDTO).exec();
        return this.supporterModel.findById(id).exec();
    }

    async delete(id: string) {
        const deleted = await this.supporterModel.findByIdAndDelete(id).exec();

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
