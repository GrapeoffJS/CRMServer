import {
    IsOptional,
    IsNotEmpty,
    IsString,
    IsEnum,
    IsObject
} from 'class-validator';
import { ActionPermissions } from '../models/ActionPermissions';
import { DataPermissions } from '../models/DataPermissions';

export class UpdateRoleDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEnum(ActionPermissions, { each: true })
    actionPermissions?: ActionPermissions[];

    @IsOptional()
    @IsObject()
    dataPermissions?: DataPermissions;
}
