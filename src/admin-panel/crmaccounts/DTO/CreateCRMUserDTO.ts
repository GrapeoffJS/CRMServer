import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
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

    @IsNotEmpty()
    @IsString()
    role: string;

    @IsEnum(AccountTypes)
    accountType: AccountTypes;
}
