import { CRMUser } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';

export class Manager extends CRMUser {
    @prop({ type: () => String, default: AccountTypes.Manager })
    accountType: string;
}
