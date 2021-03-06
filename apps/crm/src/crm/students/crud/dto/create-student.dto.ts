import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsEnum,
    IsISO8601,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateNested
} from 'class-validator';
import { CountryCode, getCountries } from 'libphonenumber-js';

import { IsCorrectPhoneNumber } from '../lib/IsCorrectPhoneNumber';
import { IsCountryCode } from '../lib/IsCountryCode';
import { Genders } from '../types/genders';

export class PhoneNumber {
    @ApiProperty({ type: () => getCountries(), isArray: true })
    @IsCountryCode({ message: 'countryCode must be a correct country code' })
    countryCode: CountryCode;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(prop => prop.value.replace(/\D/g, ''))
    @IsCorrectPhoneNumber({
        message: 'phone must be correct and match country code'
    })
    phone: string;
}

export class CreateStudentDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    surname: string;

    @ApiProperty({ required: true })
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

    @ApiProperty({ type: () => PhoneNumber })
    @IsOptional()
    @Type(() => PhoneNumber)
    @ValidateNested()
    phone: PhoneNumber;

    @ApiProperty({ type: () => PhoneNumber })
    @IsOptional()
    @Type(() => PhoneNumber)
    @ValidateNested()
    parentPhone: PhoneNumber;

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

    @ApiProperty({ description: 'Must be a mongo id', required: true })
    @IsMongoId()
    salesFunnelStep: string;
}
