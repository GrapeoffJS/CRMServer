import { ActionPermissions } from '../types/ActionPermissions';
import { DataPermissions } from '../types/DataPermissions';
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
