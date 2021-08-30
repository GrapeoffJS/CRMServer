import { Genders } from '../models/Genders';
import {
    IsEnum,
    IsISO8601,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';

export class UpdatePupilDTO {
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
    @IsEnum(Genders)
    gender: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsISO8601({ strict: true })
    dateOfBirth: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    parentPhone: string;

    @IsOptional()
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
