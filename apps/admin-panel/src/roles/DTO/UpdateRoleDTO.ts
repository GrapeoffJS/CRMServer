import {
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString
} from 'class-validator';
import { ActionPermissions } from '../types/ActionPermissions';
import { DataPermissions } from '../types/DataPermissions';

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
