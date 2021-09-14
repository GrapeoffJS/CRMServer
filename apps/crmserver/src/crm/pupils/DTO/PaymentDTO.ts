import { Type } from 'class-transformer';
import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';

export class PaymentDTO {
    @Type(() => Number)
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    amount?: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    subscription?: string;
}
