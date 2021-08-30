import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString
} from 'class-validator';

export class UpdateSalesFunnelStepDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;
}
