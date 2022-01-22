import { Injectable, NotFoundException } from '@nestjs/common';
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

    async create(createTutorDTO: CreateTutorDTO): Promise<TutorModel> {
        createTutorDTO.password = await this.passwordProtector.hash(
            createTutorDTO.password
        );

        return this.tutorModel.create(createTutorDTO);
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: TutorModel[] }> {
        let count: number;

        this.tutorModel.countDocuments((err, docsCount) => {
            count = docsCount;
        });

        return {
            count,
            docs: await this.tutorModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<TutorModel> {
        const found = await this.tutorModel.findById(id);

        if (!found) {
            throw new NotFoundException();
        }

        return found;
    }

    async update(
        id: string,
        updateTutorDTO: UpdateTutorDTO
    ): Promise<TutorModel> {
        const updated = this.tutorModel.findByIdAndUpdate(id, updateTutorDTO);

        if (!updated) {
            throw new NotFoundException();
        }

        return this.tutorModel.findById(id);
    }

    async delete(id: string): Promise<TutorModel> {
        const deleted = await this.tutorModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
