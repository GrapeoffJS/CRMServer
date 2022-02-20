import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTaskTagDto } from './dto/create-task-tag.dto';
import { UpdateTaskTagDto } from './dto/update-task-tag.dto';
import { TaskTagModel } from './models/task-tag.model';

@Injectable()
export class TagsService {
    constructor(
        @InjectModel(TaskTagModel)
        private readonly taskTagModel: ReturnModelType<typeof TaskTagModel>
    ) {}

    async create(createTaskTagDto: CreateTaskTagDto) {
        const created = await this.taskTagModel.create(createTaskTagDto);

        return this.taskTagModel.findById(created.id).lean().exec();
    }

    async get() {
        return this.taskTagModel.find().lean().exec();
    }

    async update(id: string, updateTaskTagDto: UpdateTaskTagDto) {
        const updated = await this.taskTagModel
            .findByIdAndUpdate(id, updateTaskTagDto)
            .exec();

        if (!updated) {
            throw new NotFoundException();
        }

        return this.taskTagModel.findById(id).lean().exec();
    }

    async delete(id: string) {
        const deleted = await this.taskTagModel.findByIdAndDelete(id);

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
