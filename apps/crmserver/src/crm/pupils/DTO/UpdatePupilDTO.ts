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
import Status from '../../statuses/models/Status.model';

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
    parentFullname: string;

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
    salesFunnelStep: SalesFunnelStep;

    @IsOptional()
    @IsString({ each: true })
    @IsMongoId({ each: true })
    statuses: Status[];
}
