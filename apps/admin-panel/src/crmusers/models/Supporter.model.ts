import { CRMUserModel } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';
import { ApiProperty } from '@nestjs/swagger';

export class SupporterModel extends CRMUserModel {
    @ApiProperty()
    @prop({ type: () => String, default: AccountTypes.SUPPORTER })
    accountType: string;
}
