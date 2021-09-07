import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PaymentDTO {
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    subscription?: string;
}
