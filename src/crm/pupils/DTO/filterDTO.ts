import { IsArray, IsObject, IsOptional, IsString } from 'class-validator';

export class filterDTO {
    @IsOptional()
    @IsString({ each: true })
    names?: string[];

    @IsOptional()
    @IsString({ each: true })
    surnames?: string[];

    @IsOptional()
    @IsString({ each: true })
    midnames?: string[];

    @IsOptional()
    @IsArray()
    ages?: number[];

    @IsOptional()
    @IsString({ each: true })
    gender?: string[];

    @IsOptional()
    @IsString({ each: true })
    groups?: string[];

    @IsOptional()
    @IsString({ each: true })
    tutors?: string[];

    @IsOptional()
    @IsObject()
    balance?: { $gte?: number; $lte?: number; $lt?: number };
}
