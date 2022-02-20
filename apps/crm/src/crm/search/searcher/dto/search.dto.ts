import { Transform, Type } from 'class-transformer';
import {
    ArrayMaxSize,
    ArrayMinSize,
    ArrayUnique,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    Max,
    Min
} from 'class-validator';

enum Indices {
    CRMUSER = 'crmusers',
    STUDENTS = 'students',
    GROUPS = 'groups'
}

export class SearchDto {
    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(150)
    limit: number;

    @Type(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    offset: number;

    @IsString({ each: true })
    @ArrayUnique()
    @ArrayMinSize(1)
    @ArrayMaxSize(3)
    @IsEnum(Indices, { each: true })
    @Transform(prop => prop.value.split(','))
    indices: string[];

    @IsNotEmpty()
    @IsString()
    query_string: string;
}
