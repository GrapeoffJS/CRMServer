import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { StatusModel } from './models/status.model';

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

    async create(createStatusDto: CreateStatusDto) {
        return this.statusModel.create(createStatusDto);
    }

    async update(id: string, updateStatusDto: UpdateStatusDto) {
        const found = await this.statusModel
            .findByIdAndUpdate(id, updateStatusDto)
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
