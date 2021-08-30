import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateSalesFunnelStepDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    order: number;
}
