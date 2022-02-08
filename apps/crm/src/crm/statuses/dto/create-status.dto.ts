import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    color: string;
}
