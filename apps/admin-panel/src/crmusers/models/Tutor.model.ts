import { CRMUserModel } from './CRMUser.model';
import { GroupModel } from '../../../../crm/src/crm/groups/models/Group.model';
import { WorkHours } from '../../work-hours/types/WorkHours';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';
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

    @ApiProperty()
    @prop({ type: () => String, default: AccountTypes.TUTOR })
    accountType: string;
}
