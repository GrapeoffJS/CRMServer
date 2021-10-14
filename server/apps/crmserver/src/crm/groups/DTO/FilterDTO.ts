import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class FilterDTO {
    @IsOptional()
    @IsString({ each: true })
    group_names?: string[];

    @IsOptional()
    @IsArray()
    levels?: number[];

    @IsOptional()
    @IsString({ each: true })
    tutors?: string[];

    @IsOptional()
    @IsBoolean()
    occupied?: boolean;
}
