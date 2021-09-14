import {
    IsHexColor,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSalesFunnelStepDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    order: number;

    @IsNotEmpty()
    @IsString()
    @IsHexColor()
    background: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsHexColor()
    color: string;
}
