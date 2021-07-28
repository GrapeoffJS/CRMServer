import {
    IsString,
    IsOptional,
    IsNumber,
    IsEnum,
    IsNotEmpty
} from 'class-validator';
import { Genders } from '../models/Genders';

export class createPupilDTO {
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
    @IsEnum(Genders)
    gender: string;

    @IsNotEmpty()
    @IsString()
    age: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsString()
    @IsNotEmpty()
    parentPhone: string;

    @IsString()
    @IsNotEmpty()
    parentNSM: string;

    @IsOptional()
    @IsNumber()
    balance?: number;

    @IsOptional()
    @IsString()
    discord?: string;
}
