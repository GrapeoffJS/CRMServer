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
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @Type(() => Number)
    @Min(0)
    @IsNumber({ allowNaN: false, allowInfinity: false })
    level: number;

    @ApiProperty()
    @Type(() => Number)
    @Min(0)
    @IsNumber({ allowNaN: false, allowInfinity: false })
    places: number;

    @ApiProperty()
    @IsBoolean()
    trial: boolean;

    @ApiProperty()
    @IsMongoId({ each: true })
    @ArrayMinSize(0)
    @ArrayUnique()
    students: string[];

    @ApiProperty()
    @IsMongoId()
    tutor: string;
}
