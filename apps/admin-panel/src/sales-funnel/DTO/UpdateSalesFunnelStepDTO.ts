import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSalesFunnelStepDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;
}
