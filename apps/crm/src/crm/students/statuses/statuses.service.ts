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

    async get(
        limit: number,
        offset: number
    ): Promise<{ docs: StatusModel[]; count: number }> {
        return {
            docs: await this.statusModel.find().skip(offset).limit(limit),
            count: await this.statusModel.countDocuments().exec()
        };
    }

    async create(createStatusDTO: CreateStatusDTO): Promise<StatusModel> {
        return this.statusModel.create(createStatusDTO);
    }

    async update(
        id: string,
        updateStatusDTO: UpdateStatusDTO
    ): Promise<StatusModel> {
        const found = await this.statusModel.findByIdAndUpdate(
            id,
            updateStatusDTO
        );

        if (!found) {
            throw new NotFoundException();
        }

        return this.statusModel.findById(id);
    }

    async delete(id: string): Promise<StatusModel> {
        const deleted = await this.statusModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
