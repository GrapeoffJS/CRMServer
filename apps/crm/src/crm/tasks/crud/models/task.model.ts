import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { CrmUserModel } from '../../../../../../admin-panel/src/crmusers/models/crm-user.model';
import { StudentModel } from '../../../students/crud/models/student.model';
import { BaseModel } from '../../../../../../../utils/models/base.model';
import { TaskTypes } from '../types/task-types';
import { Type } from 'class-transformer';
import { TaskTagModel } from '../../tags/models/task-tag.model';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({ schemaOptions: { collection: 'Tasks' } })
export class TaskModel extends BaseModel {
    @ApiProperty()
    @prop({ type: () => String, required: true, maxlength: 500 })
    name: string;

    @ApiProperty({ type: () => CrmUserModel })
    @Type(() => CrmUserModel)
    @prop({
        ref: () => CrmUserModel,
        required: true,
        justOne: true
    })
    responsible: Ref<CrmUserModel>;

    @ApiProperty({ type: () => StudentModel })
    @Type(() => StudentModel)
    @prop({ ref: () => StudentModel, justOne: true, default: null })
    for: Ref<StudentModel>;

    @ApiProperty({ type: () => Date })
    @prop({ type: () => Date, required: true })
    deadline: Date;

    @ApiProperty({ type: () => Date })
    @prop({ type: () => Date, default: null })
    completedOn: Date;

    @ApiProperty()
    @prop({ type: () => String, maxlength: 1500 })
    text: string;

    @ApiProperty({ enum: () => TaskTypes })
    @prop({ type: () => Number, required: true })
    type: number;

    @ApiProperty({ type: () => TaskTagModel, isArray: true })
    @Type(() => TaskTagModel)
    @prop({ ref: () => TaskTagModel })
    tags: Ref<TaskTagModel>[];

    @ApiProperty()
    @prop({ type: () => Boolean, default: false })
    archived: boolean;

    @ApiProperty()
    @prop({ type: () => Boolean, default: false })
    done: boolean;
}
