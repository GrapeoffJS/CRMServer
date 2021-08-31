import {
    IsNotEmpty,
    IsNumber,
    IsNumberString,
    Max,
    Min
} from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDTO {
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(150)
    limit: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    offset: number;
}
