import { CRMUser } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';

export class Supporter extends CRMUser {
    @prop({ type: () => String, default: AccountTypes.Supporter })
    accountType: string;
}
