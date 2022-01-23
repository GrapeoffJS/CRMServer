import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';
import { TaskModel } from '../models/Task.model';

@Injectable()
export class CurrentUserTasksService {
    constructor(
        @InjectModel(TaskModel)
        private readonly taskModel: ReturnModelType<typeof TaskModel>
    ) {}

    async findAll(tags: string[] | undefined, id: string) {
        const tagsFilter =
            typeof tags === 'object'
                ? {
                      $match: {
                          tags: { $all: tags.map(tag => Types.ObjectId(tag)) }
                      }
                  }
                : { $match: {} };

        return this.taskModel.aggregate([
            {
                $match: {
                    responsible: Types.ObjectId(id)
                }
            },
            tagsFilter,
            {
                $sort: {
                    deadline: 1
                }
            },
            {
                $lookup: {
                    from: 'TaskTags',
                    localField: 'tags',
                    foreignField: '_id',
                    as: 'tags'
                }
            }
        ]);
    }
}
