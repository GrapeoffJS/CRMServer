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

export class CreateSalesFunnelStepDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    order: number;

    @ApiProperty({ required: true })
    @IsHexColor()
    background: string;

    @ApiProperty()
    @IsOptional()
    @IsHexColor()
    color: string;
}
