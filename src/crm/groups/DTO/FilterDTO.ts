import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';
export class FilterDTO {
    @IsOptional()
    @IsString({ each: true })
    GROUP_NAMES?: string[];

    @IsOptional()
    @IsArray()
    LEVELS?: number[];

    @IsOptional()
    @IsString({ each: true })
    TUTORS?: string[];

    @IsOptional()
    @IsBoolean()
    OCCUPIED?: boolean;
}
