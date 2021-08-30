import { Genders } from '../models/Genders';
import {
    IsEnum,
    IsISO8601,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';

export class CreatePupilDTO {
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
    @IsISO8601({ strict: true })
    dateOfBirth: string;

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
