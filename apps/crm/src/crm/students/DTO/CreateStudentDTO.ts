import {
    IsEnum,
    IsISO8601,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';
import { Genders } from '../types/Genders';

export class CreateStudentDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsNotEmpty()
    @IsString()
    middleName: string;

    @IsEnum(Genders)
    gender: string;

    @IsISO8601({ strict: true })
    dateOfBirth: Date;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsNotEmpty()
    @IsString()
    parentPhone: string;

    @IsNotEmpty()
    @IsString()
    parentFullName: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    discord?: string;

    @IsMongoId()
    salesFunnelStep: string;
}
