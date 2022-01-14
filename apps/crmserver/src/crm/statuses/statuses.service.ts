import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import Status from './models/Status.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CreateStatusDTO } from './DTO/CreateStatusDTO';
import { UpdateStatusDTO } from './DTO/UpdateStatusDTO';

@Injectable()
export class StatusesService {
    constructor(
        @InjectModel(Status)
        private readonly StatusModel: ReturnModelType<typeof Status>
    ) {}

    async findAll() {
        return this.StatusModel.find();
    }

    async create(createStatusDTO: CreateStatusDTO) {
        return this.StatusModel.create(createStatusDTO);
    }

    async update(id: string, updateStatusDTO: UpdateStatusDTO) {
        await this.StatusModel.findByIdAndUpdate(id, updateStatusDTO);

        return this.StatusModel.findById(id);
    }

    async delete(id: string) {
        return this.StatusModel.findByIdAndDelete(id);
    }
}
