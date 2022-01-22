import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './DTO/CreateTaskDTO';
import { InjectModel } from 'nestjs-typegoose';
import { TaskModel } from './models/Task.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UpdateTaskDTO } from './DTO/UpdateTaskDTO';
import { CRMUserModel } from '../../../../admin-panel/src/crmusers/models/CRMUser.model';
import { TaskTagModel } from '../task-tags/models/TaskTag.model';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(TaskModel)
        private readonly taskModel: ReturnModelType<typeof TaskModel>
    ) {}

    async create(createTaskDTO: CreateTaskDTO) {
        const task = await this.taskModel.create(createTaskDTO);

        return this.taskModel.findById(task.id).populate([
            {
                path: 'responsible',
                model: CRMUserModel
            },
            {
                path: 'tags',
                model: TaskTagModel
            }
        ]);
    }

    async delete(id: string) {
        return this.taskModel.findByIdAndDelete(id);
    }

    async update(id: string, updateTaskDTO: UpdateTaskDTO) {
        await this.taskModel.updateOne({ _id: id }, updateTaskDTO);
        return this.taskModel.findById(id);
    }
}
