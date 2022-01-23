import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeOrderDTO {
    @ApiProperty()
    @IsMongoId()
    id: string;

    @ApiProperty()
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    newOrder: number;
}
