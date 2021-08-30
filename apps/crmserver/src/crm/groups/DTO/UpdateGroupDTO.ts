import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString
} from 'class-validator';

export class UpdateGroupDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    group_name: string;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    level: number;

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
