import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateSubscriptionDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    hoursCount: number;
}
