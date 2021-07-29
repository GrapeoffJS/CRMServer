import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class updateSubscriptionDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    price: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    houseCount: string;
}
