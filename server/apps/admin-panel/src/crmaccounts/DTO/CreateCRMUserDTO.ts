import {
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString
} from 'class-validator';
import { AccountTypes } from '../models/AccountTypes';
import { ActionPermissions } from '../../roles/models/ActionPermissions';
import { DataPermissions } from '../../roles/models/DataPermissions';

export class CreateCRMUserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsNotEmpty()
    @IsString()
    midname: string;

    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    role: string;

    @IsOptional()
    @IsEnum(ActionPermissions, { each: true })
    localActionPermissions?: ActionPermissions[];

    @IsOptional()
    @IsObject()
    localDataPermissions?: DataPermissions;

    @IsEnum(AccountTypes)
    accountType: AccountTypes;

    @IsOptional()
    @IsString()
    subject: string;
}
