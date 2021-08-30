import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString
} from 'class-validator';

export class CreateGroupDTO {
    @IsString()
    @IsNotEmpty()
    group_name: string;

    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    level: number;

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
