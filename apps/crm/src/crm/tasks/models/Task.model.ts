import { TaskTypes } from './TaskTypes';
import { prop } from '@typegoose/typegoose';
import { CRMUserModel } from '../../../../../admin-panel/src/crmusers/models/CRMUser.model';
import { StudentModel } from '../../students/models/Student.model';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { TaskTagModel } from '../../task-tags/models/TaskTag.model';

export class TaskModel extends TimeStamps {
    @prop({ type: () => String, required: true })
    name: string;

    @prop({ type: () => CRMUserModel, ref: () => CRMUserModel, required: true })
    responsible: string;

    @prop({ type: () => StudentModel, ref: () => StudentModel })
    for: string;

    @prop({ type: () => Date, required: true })
    deadline: string;

    @prop({ type: () => Date })
    completedOn: string;

    @prop({ type: () => String })
    text: string;

    @prop({ type: () => Number, enum: TaskTypes, default: null })
    type: TaskTypes;

    @prop({ type: () => Boolean, default: false })
    done: boolean;

    @prop({ type: () => [TaskTagModel], ref: () => TaskTagModel })
    tags: string[];

    @prop({ type: () => Boolean, default: false })
    archived: boolean;
}
