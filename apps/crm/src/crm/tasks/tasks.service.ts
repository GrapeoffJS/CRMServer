import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './DTO/CreateTaskDTO';
import { InjectModel } from 'nestjs-typegoose';
import { Task } from './models/Task.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { UpdateTaskDTO } from './DTO/UpdateTaskDTO';
import { CRMUser } from '../../../../admin-panel/src/crmusers/models/CRMUser.model';
import { TaskTag } from '../task-tags/models/TaskTag.model';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task)
        private readonly TaskModel: ReturnModelType<typeof Task>
    ) {}

    async create(createTaskDTO: CreateTaskDTO) {
        const task = await this.TaskModel.create(createTaskDTO);

        return this.TaskModel.findById(task.id).populate([
            {
                path: 'responsible',
                model: CRMUser
            },
            {
                path: 'tags',
                model: TaskTag
            }
        ]);
    }

    async delete(id: string) {
        return this.TaskModel.findByIdAndDelete(id);
    }

    async update(id: string, updateTaskDTO: UpdateTaskDTO) {
        await this.TaskModel.updateOne({ _id: id }, updateTaskDTO);
        return this.TaskModel.findById(id);
    }
}
