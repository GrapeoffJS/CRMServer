import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { TaskModel } from './models/task.model';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DateTime } from 'luxon';
import { Types } from 'mongoose';

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
            .populate('responsible for tags')
            .lean()
            .exec();
    }

    async get(id: string, tags: string[]) {
        const tagsFilter =
            tags === undefined
                ? { $match: {} }
                : {
                      $match: {
                          tags: {
                              $all: tags.map(tag => new Types.ObjectId(tag))
                          }
                      }
                  };

        return this.taskModel
            .aggregate()
            .facet({
                overdue: [
                    {
                        $match: {
                            responsible: new Types.ObjectId(id),
                            deadline: {
                                $lt: DateTime.now().toJSDate()
                            },
                            archived: false,
                            done: false
                        }
                    },
                    {
                        $lookup: {
                            from: 'CRMUsers',
                            as: 'responsible',
                            localField: 'responsible',
                            foreignField: '_id'
                        }
                    },
                    {
                        $lookup: {
                            from: 'Students',
                            as: 'for',
                            localField: 'for',
                            foreignField: '_id'
                        }
                    },
                    tagsFilter,
                    {
                        $lookup: {
                            from: 'TaskTags',
                            localField: 'tags',
                            foreignField: '_id',
                            as: 'tags'
                        }
                    },
                    { $sort: { deadline: 1 } }
                ],
                forToday: [
                    {
                        $match: {
                            responsible: new Types.ObjectId(id),
                            $and: [
                                {
                                    deadline: {
                                        $gte: DateTime.now().toJSDate()
                                    }
                                },
                                {
                                    deadline: {
                                        $lte: DateTime.now()
                                            .set({
                                                hour: 23,
                                                minute: 59,
                                                second: 59
                                            })
                                            .toJSDate()
                                    }
                                }
                            ],
                            archived: false,
                            done: false
                        }
                    },
                    {
                        $lookup: {
                            from: 'CRMUsers',
                            as: 'responsible',
                            localField: 'responsible',
                            foreignField: '_id'
                        }
                    },
                    {
                        $lookup: {
                            from: 'Students',
                            as: 'for',
                            localField: 'for',
                            foreignField: '_id'
                        }
                    },
                    tagsFilter,
                    {
                        $lookup: {
                            from: 'TaskTags',
                            localField: 'tags',
                            foreignField: '_id',
                            as: 'tags'
                        }
                    },
                    { $sort: { deadline: 1 } }
                ],
                future: [
                    {
                        $match: {
                            responsible: new Types.ObjectId(id),
                            deadline: {
                                $gt: DateTime.now()
                                    .set({
                                        hour: 23,
                                        minute: 59,
                                        second: 59
                                    })
                                    .toJSDate()
                            },
                            archived: false,
                            done: false
                        }
                    },
                    {
                        $lookup: {
                            from: 'CRMUsers',
                            as: 'responsible',
                            localField: 'responsible',
                            foreignField: '_id'
                        }
                    },
                    {
                        $lookup: {
                            from: 'Students',
                            as: 'for',
                            localField: 'for',
                            foreignField: '_id'
                        }
                    },
                    tagsFilter,
                    {
                        $lookup: {
                            from: 'TaskTags',
                            localField: 'tags',
                            foreignField: '_id',
                            as: 'tags'
                        }
                    },
                    { $sort: { deadline: 1 } }
                ],
                completedToday: [
                    {
                        $match: {
                            responsible: new Types.ObjectId(id),
                            $and: [
                                {
                                    deadline: {
                                        $gte: DateTime.now()
                                            .set({
                                                hour: 0,
                                                minute: 0,
                                                second: 0
                                            })
                                            .toJSDate()
                                    }
                                },
                                {
                                    deadline: {
                                        $lte: DateTime.now()
                                            .set({
                                                hour: 23,
                                                minute: 59,
                                                second: 59
                                            })
                                            .toJSDate()
                                    }
                                }
                            ],
                            done: true
                        }
                    },
                    {
                        $lookup: {
                            from: 'CRMUsers',
                            as: 'responsible',
                            localField: 'responsible',
                            foreignField: '_id'
                        }
                    },
                    {
                        $lookup: {
                            from: 'Students',
                            as: 'for',
                            localField: 'for',
                            foreignField: '_id'
                        }
                    },
                    tagsFilter,
                    {
                        $lookup: {
                            from: 'TaskTags',
                            localField: 'tags',
                            foreignField: '_id',
                            as: 'tags'
                        }
                    },
                    { $sort: { deadline: 1 } }
                ]
            })
            .exec();
    }

    async update(id: string, updateTaskDto: UpdateTaskDto) {
        const updated = this.taskModel.findByIdAndUpdate(id, updateTaskDto);

        if (!updated) {
            throw new NotFoundException();
        }

        return this.taskModel
            .findById(id)
            .populate('responsible for tags')
            .lean()
            .exec();
    }

    async delete(id: string) {
        const deleted = await this.taskModel
            .findByIdAndDelete(id)
            .populate('responsible for tags')
            .lean()
            .exec();

        if (!deleted) {
            throw new NotFoundException();
        }

        return deleted;
    }
}
