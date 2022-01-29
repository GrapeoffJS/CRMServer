import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { StatusModel } from './models/Status.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateStatusDTO } from './DTO/CreateStatusDTO';
import { UpdateStatusDTO } from './DTO/UpdateStatusDTO';

@Injectable()
export class StatusesService {
    constructor(
        @InjectModel(StatusModel)
        private readonly statusModel: ReturnModelType<typeof StatusModel>
    ) {}

    async get(limit: number, offset: number) {
        return {
            docs: await this.statusModel.find().skip(offset).limit(limit),
            count: await this.statusModel.countDocuments().exec()
        };
    }

    async create(createStatusDTO: CreateStatusDTO) {
        return this.statusModel.create(createStatusDTO);
    }

    async update(id: string, updateStatusDTO: UpdateStatusDTO) {
        const found = await this.statusModel
            .findByIdAndUpdate(id, updateStatusDTO)
            .exec();

        if (!found) {
            throw new NotFoundException();
        }

        return this.statusModel.findById(id).exec();
    }

    async delete(id: string) {
        const deleted = await this.statusModel.findByIdAndDelete(id).exec();

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
