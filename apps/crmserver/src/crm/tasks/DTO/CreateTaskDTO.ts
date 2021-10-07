import {
    IsDate,
    IsEnum,
    IsISO8601,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';
import { Type } from 'class-transformer';
import { TaskTypes } from './TaskTypes';

export class CreateTaskDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsMongoId()
    responsible: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    deadline: Date;

    @IsNotEmpty()
    @IsMongoId()
    for: string;

    @IsOptional()
    @IsString()
    text: string;

    @IsOptional()
    @IsEnum(TaskTypes)
    type: TaskTypes;
}
