import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { PasswordProtectorService } from '../password-protector/password-protector.service';
import { CreateTutorDTO } from '../../DTO/Tutor/CreateTutorDTO';
import { UpdateTutorDTO } from '../../DTO/Tutor/UpdateTutorDTO';
import { Tutor } from '../../models/Tutor.model';

@Injectable()
export class TutorService {
    constructor(
        @InjectModel(Tutor)
        private readonly tutorModel: ReturnModelType<typeof Tutor>,
        private readonly passwordProtector: PasswordProtectorService
    ) {}

    async create(createTutorDTO: CreateTutorDTO): Promise<Tutor> {
        createTutorDTO.password = await this.passwordProtector.hash(
            createTutorDTO.password
        );

        return this.tutorModel.create(createTutorDTO);
    }

    async get(
        limit: number,
        offset: number
    ): Promise<{ count: number; docs: Tutor[] }> {
        let count: number;

        this.tutorModel.countDocuments((err, docsCount) => {
            count = docsCount;
        });

        return {
            count,
            docs: await this.tutorModel.find().skip(offset).limit(limit)
        };
    }

    async getByID(id: string): Promise<Tutor> {
        return this.tutorModel.findById(id);
    }

    async update(id: string, updateTutorDTO: UpdateTutorDTO): Promise<Tutor> {
        const updated = this.tutorModel.findByIdAndUpdate(id, updateTutorDTO);

        if (!updated) {
            throw new NotFoundException();
        }

        return this.tutorModel.findById(id);
    }

    async delete(id: string): Promise<Tutor> {
        const deleted = await this.tutorModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
