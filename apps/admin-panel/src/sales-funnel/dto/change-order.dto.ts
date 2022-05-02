import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ChangeOrderDto {
    @ApiProperty({ required: true })
    @IsMongoId()
    id: string;

    @ApiProperty({ required: true })
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    newOrder: number;
}
