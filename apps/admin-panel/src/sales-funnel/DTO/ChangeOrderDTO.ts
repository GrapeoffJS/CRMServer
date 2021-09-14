import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min
} from 'class-validator';
import { Type } from 'class-transformer';

export class ChangeOrderDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    id: string;

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    newOrder: number;
}
