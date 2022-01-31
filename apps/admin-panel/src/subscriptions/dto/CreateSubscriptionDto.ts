import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @Type(() => Number)
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    price: number;

    @ApiProperty()
    @Type(() => Number)
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    hoursCount: number;
}
