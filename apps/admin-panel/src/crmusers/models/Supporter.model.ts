import { CRMUserModel } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';

export class SupporterModel extends CRMUserModel {
    @prop({ type: () => String, default: AccountTypes.Supporter })
    accountType: string;
}
