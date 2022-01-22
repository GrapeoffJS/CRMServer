import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import StatusModel from './models/Status.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateStatusDTO } from './DTO/CreateStatusDTO';
import { UpdateStatusDTO } from './DTO/UpdateStatusDTO';

@Injectable()
export class StatusesService {
    constructor(
        @InjectModel(StatusModel)
        private readonly statusModel: ReturnModelType<typeof StatusModel>
    ) {}

    async findAll() {
        return this.statusModel.find();
    }

    async create(createStatusDTO: CreateStatusDTO) {
        return this.statusModel.create(createStatusDTO);
    }

    async update(id: string, updateStatusDTO: UpdateStatusDTO) {
        const found = await this.statusModel.findByIdAndUpdate(
            id,
            updateStatusDTO
        );

        if (!found) {
            throw new NotFoundException();
        }

        return this.statusModel.findById(id);
    }

    async delete(id: string) {
        return this.statusModel.findByIdAndDelete(id);
    }
}
