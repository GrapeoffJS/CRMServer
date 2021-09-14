import { IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateSalesFunnelStepDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsHexColor()
    background: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsHexColor()
    color: string;
}
