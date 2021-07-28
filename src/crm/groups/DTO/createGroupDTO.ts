import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

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
    PUPILS?: string[];

    @IsOptional()
    @IsString()
    TUTOR?: string | null;
}
