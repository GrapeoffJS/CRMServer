import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { TaskModel } from './models/task.model';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DateTime } from 'luxon';

@Injectable()
export class CrudService {
    constructor(
        @InjectModel(TaskModel)
        private readonly taskModel: ReturnModelType<typeof TaskModel>
    ) {}

    async create(createTaskDto: CreateTaskDto) {
        const task = await this.taskModel.create(createTaskDto);

        return this.taskModel
            .findById(task.id)
            .populate('responsible for')
            .lean()
            .exec();
    }

    async get(id: string, tags: string[]) {
        return this.taskModel
            .find({
                responsible: id,
                deadline: {
                    $lt: DateTime.now()
                        .plus({ day: 1 })
                        .set({ hour: 23, minute: 59, second: 59 })
                        .toJSDate()
                },
                tags: tags.length === 0 ? {} : { $all: tags },
                archived: false
            })
            .sort({ deadline: 1 })
            .populate('responsible for')
            .lean()
            .exec();
    }

    async update(id: string, updateTaskDto: UpdateTaskDto) {
        const updated = this.taskModel.findByIdAndUpdate(id, updateTaskDto);

        if (!updated) {
            throw new NotFoundException();
        }

        return this.taskModel
            .findById(id)
            .populate('responsible for')
            .lean()
            .exec();
    }

    async delete(id: string) {
        const deleted = await this.taskModel
            .findByIdAndDelete(id)
            .populate('responsible for')
            .lean()
            .exec();

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
