import { ActionPermissions } from '../models/ActionPermissions';
import { DataPermissions } from '../models/DataPermissions';
import { IsEnum, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class CreateRoleDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEnum(ActionPermissions, { each: true })
    actionPermissions: ActionPermissions[];

    @IsObject()
    dataPermissions: DataPermissions;
}
