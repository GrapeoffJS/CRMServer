import {
    IsEnum,
    IsNotEmpty,
    IsString,
    IsMongoId,
    IsOptional
} from 'class-validator';
import { AccountTypes } from '../models/AccountTypes';

export class UpdateCRMUserDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    midname: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    role: string;

    @IsOptional()
    @IsEnum(AccountTypes)
    accountType: AccountTypes;
}
