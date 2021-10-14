import { IsBoolean, IsEnum, IsISO8601, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskTypes } from '../models/TaskTypes';

export class UpdateTaskDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsMongoId()
    responsible: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsISO8601({ strict: true })
    deadline: string;

    @IsOptional()
    @IsString()
    text: string;

    @IsOptional()
    @IsEnum(TaskTypes)
    type: TaskTypes;

    @IsOptional()
    @IsBoolean()
    done: boolean;
}
