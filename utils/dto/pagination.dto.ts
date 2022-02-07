import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(150)
    limit: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    offset: number;
}
