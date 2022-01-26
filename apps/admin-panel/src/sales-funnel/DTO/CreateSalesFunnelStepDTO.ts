import {
    IsHexColor,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSalesFunnelStepDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    order: number;

    @ApiProperty()
    @IsHexColor()
    background: string;

    @ApiProperty()
    @IsOptional()
    @IsHexColor()
    color: string;
}
