import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class LimitDTO {
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(150)
    limit: number;
}
