import { IsString, IsNotEmpty } from 'class-validator';

export class createSubscriptionDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    price: string;

    @IsNotEmpty()
    @IsString()
    houseCount: string;
}
