import {
    IsEnum,
    IsISO8601,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';
import { Genders } from '../types/Genders';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    surname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    middleName: string;

    @ApiProperty({ enum: () => Genders })
    @IsOptional()
    @IsEnum(Genders)
    gender: string;

    @ApiProperty({ type: () => Date })
    @IsOptional()
    @IsISO8601({ strict: true })
    dateOfBirth: Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    parentPhone: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    parentFullName: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    discord?: string;

    @ApiProperty({ description: 'Must be a mongo id' })
    @IsMongoId()
    salesFunnelStep: string;
}
