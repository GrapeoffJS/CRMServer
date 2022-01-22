import { CRMUserModel } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';

export class PartnerModel extends CRMUserModel {
    @prop({ type: () => String, default: AccountTypes.Partner })
    accountType: string;
}
