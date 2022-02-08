import {
    ArrayMinSize,
    ArrayUnique,
    IsBoolean,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
    Min
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @Type(() => Number)
    @Min(0)
    @IsNumber({ allowNaN: false, allowInfinity: false })
    level: number;

    @ApiProperty({ required: true })
    @Type(() => Number)
    @Min(0)
    @IsNumber({ allowNaN: false, allowInfinity: false })
    places: number;

    @ApiProperty({ required: true })
    @IsBoolean()
    trial: boolean;

    @ApiProperty({ required: true, isArray: true, minLength: 0 })
    @IsMongoId({ each: true })
    @ArrayMinSize(0)
    @ArrayUnique()
    students: string[];

    @ApiProperty({ required: true })
    @IsMongoId()
    tutor: string;
}
