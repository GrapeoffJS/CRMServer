import CRMUser from '../../../crmaccounts/models/CRMUser.model';
import { Group } from '../../groups/models/Group.model';
import { prop } from '@typegoose/typegoose';

export class Tutor {
    @prop({ type: String, ref: () => CRMUser, required: true })
    tutor: string;

    @prop({ type: String, ref: () => Group, required: true })
    group: string;
}
