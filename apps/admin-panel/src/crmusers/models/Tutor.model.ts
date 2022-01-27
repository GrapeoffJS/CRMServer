import { CRMUserModel } from './CRMUser.model';
import { GroupModel } from '../../../../crm/src/crm/groups/models/Group.model';
import { WorkHours } from '../../work-hours/models/WorkHours';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
})
export class TutorModel extends CRMUserModel {
    @prop({
        type: [GroupModel],
        ref: () => GroupModel,
        localField: '_id',
        foreignField: 'tutor',
        autopopulate: { maxDepth: 1 }
    })
    groups: Ref<GroupModel>[];

    @prop({ type: () => Object, default: null })
    workHours: WorkHours;

    @prop({ type: () => String, default: null })
    subject: string;

    @prop({ type: () => String, default: AccountTypes.Tutor })
    accountType: string;
}
