import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    hoursCount: number;
}
