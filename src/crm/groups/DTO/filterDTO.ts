import {
    IsArray,
    IsBoolean,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';
export class filterDTO {
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
