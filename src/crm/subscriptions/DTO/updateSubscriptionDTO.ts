import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateSubscriptionDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    houseCount: number;
}
