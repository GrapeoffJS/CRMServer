import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateSubscriptionDTO {
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
