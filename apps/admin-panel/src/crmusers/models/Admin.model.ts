import { CRMUserModel } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';

export class AdminModel extends CRMUserModel {
    @prop({ type: () => String, default: AccountTypes.Admin })
    accountType: string;
}
