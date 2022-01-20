import { CRMUser } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';

export class Partner extends CRMUser {
    @prop({ type: () => String, default: AccountTypes.Partner })
    accountType: string;
}
