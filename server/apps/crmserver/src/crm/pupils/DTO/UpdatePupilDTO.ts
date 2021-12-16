import { Genders } from '../models/Genders';
import {
    IsEnum,
    IsISO8601,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';
import Status from '../../statuses/models/Status.model';

export class UpdatePupilDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    surname?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    midname?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsEnum(Genders)
    gender?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsISO8601({ strict: true })
    dateOfBirth?: string;

    @IsOptional()
    @IsString({ each: true })
    phones?: string[];

    @IsOptional()
    @IsNotEmpty()
    @IsString({ each: true })
    parentPhones?: string[];

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    parentFullname?: string;

    @IsOptional()
    @IsNumber()
    balance?: number;

    @IsOptional()
    @IsString()
    discord?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    salesFunnelStep?: string;

    @IsOptional()
    @IsString({ each: true })
    @IsMongoId({ each: true })
    statuses?: Status[];
}
