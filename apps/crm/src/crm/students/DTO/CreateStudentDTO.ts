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

export class CreateStudentDTO {
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
    @IsEnum(Genders)
    gender: string;

    @ApiProperty({ type: () => Date })
    @IsISO8601({ strict: true })
    dateOfBirth: Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    parentPhone: string;

    @ApiProperty()
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
