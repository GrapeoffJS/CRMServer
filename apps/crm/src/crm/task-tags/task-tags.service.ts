import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { TaskTagModel } from './models/TaskTag.model';
import { CreateTaskTagDTO } from './DTO/CreateTaskTagDTO';
import { UpdateTaskTagDTO } from './DTO/UpdateTaskTagDTO';

@Injectable()
export class TaskTagsService {
    constructor(
        @InjectModel(TaskTagModel)
        private readonly taskTagModel: ReturnModelType<typeof TaskTagModel>
    ) {}

    async findAll() {
        return this.taskTagModel.find();
    }

    async create(createTaskTagDTO: CreateTaskTagDTO) {
        return this.taskTagModel.create(createTaskTagDTO);
    }

    async update(id: string, updateTaskTagDTO: UpdateTaskTagDTO) {
        await this.taskTagModel.findByIdAndUpdate(id, updateTaskTagDTO);

        return this.taskTagModel.findById(id);
    }

    async delete(id: string) {
        return this.taskTagModel.findByIdAndDelete(id);
    }
}
