import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSubscriptionDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @Type(() => Number)
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    price: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    hoursCount: number;
}
