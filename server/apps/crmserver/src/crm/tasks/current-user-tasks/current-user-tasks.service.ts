import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Task } from '../models/Task.model';
import { InjectModel } from 'nestjs-typegoose';
import moment from 'moment';
import { Types } from 'mongoose';

@Injectable()
export class CurrentUserTasksService {
    constructor(
        @InjectModel(Task)
        private readonly TaskModel: ReturnModelType<typeof Task>
    ) {}

    public async findAll(id: string) {
        return this.TaskModel.aggregate([
            {
                $match: {
                    responsible: Types.ObjectId(id)
                }
            },
            {
                $match: {
                    deadline: {
                        $lt: new Date(
                            moment()
                                .add(1, 'day')
                                .set('hour', 23)
                                .minutes(59)
                                .seconds(59)
                                .toISOString()
                        )
                    }
                }
            }
        ]);
    }
}
