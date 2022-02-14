import {
    ArrayMinSize,
    ArrayUnique,
    IsBoolean,
    IsMongoId,
    IsNumber,
    IsString,
    Min
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GroupsPivotTableDto {
    @ApiProperty({ isArray: true, type: () => String, required: true })
    @IsString({ each: true })
    @ArrayMinSize(0)
    names: string[];

    @ApiProperty({ isArray: true, type: () => Number, required: true })
    @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
    @ArrayMinSize(0)
    @ArrayUnique()
    @Min(0, { each: true })
    levels: number[];

    @ApiProperty({ required: true })
    @IsBoolean()
    filled: boolean;

    @ApiProperty({ isArray: true, type: () => String, required: true })
    @IsMongoId({ each: true })
    @ArrayMinSize(0)
    students: string[];

    @ApiProperty({ isArray: true, type: () => String, required: true })
    @IsMongoId({ each: true })
    @ArrayMinSize(0)
    tutors: string[];
}
