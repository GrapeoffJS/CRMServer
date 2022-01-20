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
import { SalesFunnelStep } from '../../../../../admin-panel/src/sales-funnel/models/SalesFunnelStep.model';

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
    @IsString({ each: true })
    phones?: string[];

    @IsNotEmpty()
    @IsString({ each: true })
    parentPhones: string[];

    @IsNotEmpty()
    @IsString()
    parentFullname: string;

    @IsOptional()
    @IsNumber()
    balance?: number;

    @IsOptional()
    @IsString()
    discord?: string;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    salesFunnelStep: SalesFunnelStep;
}
