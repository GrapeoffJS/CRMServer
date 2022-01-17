import CRMUser from '../../crmaccounts/models/CRMUser.model';
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { Group } from 'apps/crm/src/crm/groups/models/Group.model';
import { WorkHours } from '../../work-hours/models/WorkHours';

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
        foreignField: 'tutor'
    })
    groups: Ref<Group>[];

    @prop({ type: Object, default: null })
    workHours: WorkHours;

    @prop({ type: String, default: null })
    subject: string;
}
