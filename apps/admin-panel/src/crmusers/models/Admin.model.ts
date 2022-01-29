import { CRMUserModel } from './CRMUser.model';
import { post, prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';
import { ApiProperty } from '@nestjs/swagger';

export class AdminModel extends CRMUserModel {
    @ApiProperty()
    @prop({ type: () => String, default: AccountTypes.Admin })
    accountType: string;
}
