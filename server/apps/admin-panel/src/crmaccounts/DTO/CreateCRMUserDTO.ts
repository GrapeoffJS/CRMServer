import {
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';
import { AccountTypes } from '../models/AccountTypes';

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

    @IsEnum(AccountTypes)
    accountType: AccountTypes;

    @IsOptional()
    @IsString()
    subject: string;
}
