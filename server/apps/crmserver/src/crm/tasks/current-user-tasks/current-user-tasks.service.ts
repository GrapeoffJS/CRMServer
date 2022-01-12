import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Task } from '../models/Task.model';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class CurrentUserTasksService {
    constructor(
        @InjectModel(Task)
        private readonly TaskModel: ReturnModelType<typeof Task>
    ) {}

    public async findAll(tags: string[] | undefined, id: string) {
        const tagsFilter =
            typeof tags === 'object'
                ? {
                      $match: {
                          tags: { $all: tags.map(tag => Types.ObjectId(tag)) }
                      }
                  }
                : { $match: {} };

        return this.TaskModel.aggregate([
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
