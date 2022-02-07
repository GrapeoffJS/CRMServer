import { CrmUserModel } from './crm-user.model';
import { GroupModel } from '../../../../crm/src/crm/groups/crud/models/group.model';
import { WorkHours } from '../../work-hours/types/work-hours';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
})
export class TutorModel extends CrmUserModel {
    @ApiProperty({ type: () => GroupModel, isArray: true })
    @prop({
        type: [GroupModel],
        ref: () => GroupModel,
        localField: '_id',
        foreignField: 'tutor'
    })
    groups: Ref<GroupModel>[];

    @ApiProperty({ type: () => WorkHours })
    @prop({ type: () => Object, default: null })
    workHours: WorkHours;

    @ApiProperty()
    @prop({ type: () => String, default: null })
    subject: string;
}
