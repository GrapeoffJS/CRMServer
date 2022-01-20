import { CRMUser } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';

export class SeniorTutor extends CRMUser {
    @prop({ type: () => String, default: AccountTypes.SeniorTutor })
    accountType: string;
}
