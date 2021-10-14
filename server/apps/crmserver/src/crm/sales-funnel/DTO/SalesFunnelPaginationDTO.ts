import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class SalesFunnelPaginationDTO {
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(1000)
    limit: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    offset: number;
}
