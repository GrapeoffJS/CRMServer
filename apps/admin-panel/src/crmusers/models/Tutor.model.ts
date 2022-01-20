import { CRMUser } from './CRMUser.model';
import { Group } from '../../../../crm/src/crm/groups/models/Group.model';
import { WorkHours } from '../../work-hours/models/WorkHours';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
})
export class Tutor extends CRMUser {
    @prop({
        type: [Group],
        ref: () => Group,
        localField: '_id',
        foreignField: 'tutor',
        select: false
    })
    groups: Ref<Group>[];

    @prop({ type: Object, default: null })
    workHours: WorkHours;

    @prop({ type: String, default: null })
    subject: string;

    @prop({ type: () => String, default: AccountTypes.Tutor })
    accountType: string;
}
