import {
    IsEnum,
    IsISO8601,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength
} from 'class-validator';
import { TaskTypes } from '../types/task-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export class CreateTaskDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(500)
    name: string;

    @ApiProperty()
    @IsMongoId()
    responsible: string;

    @ApiProperty()
    @IsOptional()
    @IsMongoId()
    for: string;

    @ApiProperty()
    @IsISO8601()
    @Transform(prop =>
        DateTime.fromISO(prop.value).setZone('Europe/Moscow').toISODate()
    )
    deadline: string;

    @ApiProperty()
    @IsString()
    @MaxLength(1500)
    text: string;

    @ApiProperty({ enum: () => TaskTypes })
    @IsEnum(TaskTypes)
    type: number;

    @ApiProperty({ isArray: true })
    @IsMongoId({ each: true })
    tags: string[];
}
