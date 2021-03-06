import { ApiProperty } from '@nestjs/swagger';
import {
    ArrayMinSize,
    IsEnum,
    IsISO8601,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength
} from 'class-validator';

import { TaskTypes } from '../types/task-types';

export class CreateTaskDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    name: string;

    @ApiProperty({ required: true })
    @IsMongoId()
    responsible: string;

    @ApiProperty()
    @IsOptional()
    @IsMongoId()
    for: string;

    @ApiProperty({ required: true })
    @IsISO8601()
    deadline: string;

    @ApiProperty({ required: true })
    @IsString()
    @MaxLength(1500)
    text: string;

    @ApiProperty({ enum: () => TaskTypes, required: true })
    @IsEnum(TaskTypes)
    type: TaskTypes;

    @ApiProperty({ isArray: true, required: true })
    @IsMongoId({ each: true })
    @ArrayMinSize(0)
    tags: string[];
}
