import {
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString
} from 'class-validator';

export class createGroupDTO {
    @IsString()
    @IsNotEmpty()
    GROUP_NAME: string;

    @IsNumber()
    @IsNotEmpty()
    LEVEL: number;

    @IsNumber()
    @IsNotEmpty()
    PLACES: number;

    @IsOptional()
    @IsString({ each: true })
    @IsMongoId({ each: true })
    PUPILS?: string[];

    @IsOptional()
    @IsString()
    // @IsMongoId()
    TUTOR?: string | null;
}
