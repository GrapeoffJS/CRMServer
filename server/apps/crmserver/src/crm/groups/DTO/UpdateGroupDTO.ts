import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateGroupDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    group_name: string;

    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    level: number;

    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    places: number;

    @IsOptional()
    @IsString({ each: true })
    @IsMongoId({ each: true })
    pupils?: string[];

    @IsOptional()
    @IsString()
    @IsMongoId()
    tutor?: string | null;
}