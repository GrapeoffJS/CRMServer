import {
    IsEnum,
    IsISO8601,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString
} from 'class-validator';
import { TaskTypes } from '../models/TaskTypes';

export class CreateTaskDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsMongoId()
    responsible: string;

    @IsNotEmpty()
    @IsString()
    @IsISO8601({ strict: true })
    deadline: string;

    @IsOptional()
    @IsMongoId()
    for: string;

    @IsOptional()
    @IsString()
    text: string;

    @IsOptional()
    @IsEnum(TaskTypes)
    type: TaskTypes;

    @IsOptional()
    @IsMongoId({ each: true })
    tags: string[];
}
