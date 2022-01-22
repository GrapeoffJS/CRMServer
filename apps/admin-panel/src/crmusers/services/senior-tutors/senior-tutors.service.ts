import { Injectable, NotFoundException } from '@nestjs/common';
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

        return this.seniorTutorModel.create(createSeniorTutorDTO);
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: SeniorTutorModel[] }> {
        let count: number;

        this.seniorTutorModel.countDocuments((err, docsCount) => {
            count = docsCount;
        });

        return {
            count,
            docs: await this.seniorTutorModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<SeniorTutorModel> {
        return this.seniorTutorModel.findById(id);
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
