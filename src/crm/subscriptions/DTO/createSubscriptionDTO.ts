import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class createSubscriptionDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsNumber()
    houseCount: number;
}
