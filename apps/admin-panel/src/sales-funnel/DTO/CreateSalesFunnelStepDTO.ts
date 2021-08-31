import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSalesFunnelStepDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    order: number;
}
