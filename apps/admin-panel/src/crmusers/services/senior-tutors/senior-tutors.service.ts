import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { CreateSeniorTutorDTO } from '../../DTO/SeniorTutor/CreateSeniorTutorDTO';
import { UpdateSeniorTutorDTO } from '../../DTO/SeniorTutor/UpdateSeniorTutorDTO';
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

    async create(
        createSeniorTutorDTO: CreateSeniorTutorDTO
    ): Promise<SeniorTutorModel> {
        createSeniorTutorDTO.password = await this.passwordProtector.hash(
            createSeniorTutorDTO.password
        );

        try {
            const user = await this.seniorTutorModel.create(
                CreateSeniorTutorDTO
            );
            return this.seniorTutorModel.findById(user.id);
        } catch (e) {
            throw new BadRequestException('User with this login exists');
        }
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: SeniorTutorModel[] }> {
        return {
            count: await this.seniorTutorModel.countDocuments().exec(),
            docs: await this.seniorTutorModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<SeniorTutorModel> {
        const found = await this.seniorTutorModel.findById(id);

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(
        id: string,
        updateSeniorTutorDTO: UpdateSeniorTutorDTO
    ): Promise<SeniorTutorModel> {
        const updated = this.seniorTutorModel.findByIdAndUpdate(
            id,
            updateSeniorTutorDTO
        );

        if (!updated) {
            throw new NotFoundException();
        }

        return this.seniorTutorModel.findById(id);
    }

    async delete(id: string): Promise<SeniorTutorModel> {
        const deleted = this.seniorTutorModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
