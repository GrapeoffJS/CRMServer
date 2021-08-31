import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional,
    IsPositive
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSubscriptionDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    @IsNotEmpty()
    @IsNumber()
    houseCount: number;
}
