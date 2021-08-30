import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional,
    IsPositive
} from 'class-validator';

export class UpdateSubscriptionDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsPositive()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsOptional()
    @IsPositive()
    @IsNotEmpty()
    @IsNumber()
    houseCount: number;
}
