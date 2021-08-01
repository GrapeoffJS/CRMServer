import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';

export class UpdateGroupDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    GROUP_NAME: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    LEVEL: number;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    PLACES: number;

    @IsOptional()
    @IsString({ each: true })
    @IsMongoId({ each: true })
    PUPILS?: string[];

    @IsOptional()
    @IsString()
    @IsMongoId()
    TUTOR?: string | null;
}
