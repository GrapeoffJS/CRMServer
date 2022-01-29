import {
    BadRequestException,
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { CreateTutorDTO } from '../../DTO/Tutor/CreateTutorDTO';
import { UpdateTutorDTO } from '../../DTO/Tutor/UpdateTutorDTO';
import { TutorModel } from '../../models/Tutor.model';

@Injectable()
export class TutorsService {
    constructor(
        @InjectModel(TutorModel)
        private readonly tutorModel: ReturnModelType<typeof TutorModel>,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(createTutorDTO: CreateTutorDTO) {
        createTutorDTO.password = await this.passwordProtector.hash(
            createTutorDTO.password
        );

        try {
            const user = await this.tutorModel.create(createTutorDTO);
            return this.tutorModel.findById(user.id).exec();
        } catch (e) {
            console.log(e);
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(limit: number, offset: number) {
        return {
            count: await this.tutorModel.countDocuments().exec(),
            docs: await this.tutorModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string) {
        const found = await this.tutorModel.findById(id).exec();

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(id: string, updateTutorDTO: UpdateTutorDTO) {
        const updated = this.tutorModel
            .findByIdAndUpdate(id, updateTutorDTO)
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        return this.tutorModel.findById(id).exec();
    }

    async delete(id: string) {
        const deleted = await this.tutorModel.findByIdAndDelete(id).exec();

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
