import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { TaskTag } from './models/TaskTag.model';
import { CreateTaskTagDTO } from './DTO/CreateTaskTagDTO';
import { UpdateTaskTagDTO } from './DTO/UpdateTaskTagDTO';

@Injectable()
export class TaskTagsService {
    constructor(
        @InjectModel(TaskTag)
        private readonly TaskTagModel: ReturnModelType<typeof TaskTag>
    ) {}

    async findAll() {
        return this.TaskTagModel.find();
    }

    async create(createTaskTagDTO: CreateTaskTagDTO) {
        return this.TaskTagModel.create(createTaskTagDTO);
    }

    async update(id: string, updateTaskTagDTO: UpdateTaskTagDTO) {
        await this.TaskTagModel.findByIdAndUpdate(id, updateTaskTagDTO);

        return this.TaskTagModel.findById(id);
    }

    async delete(id: string) {
        return this.TaskTagModel.findByIdAndDelete(id);
    }
}
