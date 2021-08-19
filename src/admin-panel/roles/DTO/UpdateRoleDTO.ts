import {
    IsOptional,
    IsNotEmpty,
    IsString,
    IsEnum,
    IsArray
} from 'class-validator';
import { ActionPermissions } from '../models/ActionPermissions';
import { DataPermissions } from '../models/DataPermissions';

export class UpdateRoleDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsArray()
    @IsEnum(ActionPermissions, { each: true })
    actionPermissions: ActionPermissions[];

    @IsArray()
    @IsEnum(DataPermissions)
    dataPermissions: DataPermissions[];
}
