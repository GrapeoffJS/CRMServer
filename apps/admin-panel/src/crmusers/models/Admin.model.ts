import { CRMUser } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';

export class Admin extends CRMUser {
    @prop({ type: () => String, default: AccountTypes.Admin })
    accountType: string;
}
