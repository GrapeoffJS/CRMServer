import { CRMUserModel } from './CRMUser.model';
import { GroupModel } from '../../../../crm/src/crm/groups/crud/models/Group.model';
import { WorkHours } from '../../work-hours/types/WorkHours';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
})
export class TutorModel extends CRMUserModel {
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
