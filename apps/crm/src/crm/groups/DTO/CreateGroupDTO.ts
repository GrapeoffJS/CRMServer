import {
    ArrayUnique,
    IsBoolean,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @Type(() => Number)
    @Min(0)
    @IsNumber()
    level: number;

    @ApiProperty()
    @Type(() => Number)
    @Min(0)
    @IsNumber()
    places: number;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    trial: boolean;

    @ApiProperty()
    @IsOptional()
    @IsMongoId({ each: true })
    @ArrayUnique()
    students: string[];

    @ApiProperty()
    @IsMongoId()
    tutor: string;
}
