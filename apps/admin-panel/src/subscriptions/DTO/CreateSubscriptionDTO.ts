import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
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
