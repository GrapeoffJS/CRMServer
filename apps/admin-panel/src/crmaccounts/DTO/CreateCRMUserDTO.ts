import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { AccountTypes } from '../Types/AccountTypes';

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
    @IsMongoId()
    role: string;

    @IsEnum(AccountTypes)
    accountType: AccountTypes;
}
