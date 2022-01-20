import { CRMUser } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';

export class Support extends CRMUser {
    @prop({ type: () => String, default: AccountTypes.Support })
    accountType: string;
}
