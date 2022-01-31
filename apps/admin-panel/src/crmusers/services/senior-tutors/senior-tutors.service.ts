import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { CreateSeniorTutorDto } from '../../dto/SeniorTutor/CreateSeniorTutorDto';
import { UpdateSeniorTutorDto } from '../../dto/SeniorTutor/UpdateSeniorTutorDto';
import { SeniorTutorModel } from '../../models/SeniorTutor.model';

@Injectable()
export class SeniorTutorsService {
    constructor(
        @InjectModel(SeniorTutorModel)
        private readonly seniorTutorModel: ReturnModelType<
            typeof SeniorTutorModel
        >,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(createSeniorTutorDto: CreateSeniorTutorDto) {
        createSeniorTutorDto.password = await this.passwordProtector.hash(
            createSeniorTutorDto.password
        );

        try {
            const user = await this.seniorTutorModel.create(
                CreateSeniorTutorDto
            );
            return this.seniorTutorModel.findById(user.id).exec();
        } catch (e) {
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.seniorTutorModel.countDocuments().exec(),
            docs: await this.seniorTutorModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string) {
        const found = await this.seniorTutorModel.findById(id).exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateSeniorTutorDto: UpdateSeniorTutorDto) {
        const updated = this.seniorTutorModel
            .findByIdAndUpdate(id, updateSeniorTutorDto)
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        return this.seniorTutorModel.findById(id).exec();
    }

    async delete(id: string) {
        const deleted = this.seniorTutorModel.findByIdAndDelete(id).exec();

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
