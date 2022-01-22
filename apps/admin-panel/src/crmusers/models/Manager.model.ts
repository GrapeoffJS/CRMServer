import { CRMUserModel } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';

export class ManagerModel extends CRMUserModel {
    @prop({ type: () => String, default: AccountTypes.Manager })
    accountType: string;
}
