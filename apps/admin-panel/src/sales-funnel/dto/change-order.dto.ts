import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
