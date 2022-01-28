import { CRMUserModel } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';
import { ApiProperty } from '@nestjs/swagger';

export class PartnerModel extends CRMUserModel {
    @ApiProperty()
    @prop({ type: () => String, default: AccountTypes.Partner })
    accountType: string;
}
