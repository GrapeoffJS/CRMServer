import { CRMUserModel } from './CRMUser.model';
import { prop } from '@typegoose/typegoose';
import { AccountTypes } from '../types/AccountTypes';
import { ApiProperty } from '@nestjs/swagger';

export class ManagerModel extends CRMUserModel {
    @ApiProperty()
    @prop({ type: () => String, default: AccountTypes.MANAGER })
    accountType: string;
}
