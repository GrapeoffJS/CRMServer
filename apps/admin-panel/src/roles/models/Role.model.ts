import { prop } from '@typegoose/typegoose';
import { ActionPermissions } from '../types/ActionPermissions';
import { DataPermissions } from '../types/DataPermissions';
import { ApiProperty } from '@nestjs/swagger';

export class RoleModel {
    @ApiProperty()
    @prop({ type: () => String, required: true, unique: true })
    name: string;

    @ApiProperty({
        enum: () => [ActionPermissions],
        isArray: true
    })
    @prop({
        type: () => [Number],
        enum: ActionPermissions,
        required: true
    })
    actionPermissions: ActionPermissions[];

    @ApiProperty({ type: () => DataPermissions })
    @prop({
        type: () => Object,
        required: true
    })
    dataPermissions: DataPermissions;
}
