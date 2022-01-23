import { ActionPermissions } from '../types/ActionPermissions';
import { DataPermissions } from '../types/DataPermissions';
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ enum: () => [ActionPermissions] })
    @IsEnum(ActionPermissions, { each: true })
    actionPermissions: ActionPermissions[];

    @ApiProperty()
    @IsObject()
    dataPermissions: DataPermissions;
}
