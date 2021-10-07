import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './DTO/CreateTaskDTO';
import { InjectModel } from 'nestjs-typegoose';
import { Task } from './models/Task.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task)
        private readonly TaskModel: ReturnModelType<typeof Task>
    ) {}

    public async create(createTaskDTO: CreateTaskDTO) {
        return this.TaskModel.create(createTaskDTO);
    }

    public async delete(id: string) {
        return this.TaskModel.findByIdAndDelete(id);
    }
}
