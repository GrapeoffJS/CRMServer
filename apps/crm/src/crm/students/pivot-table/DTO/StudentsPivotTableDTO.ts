import { Genders } from '../../types/Genders';
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsBoolean,
    IsEnum,
    IsMongoId,
    IsNumber,
    IsString
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudentsPivotTableDTO {
    @ApiProperty({ isArray: true, type: String })
    @ArrayMinSize(0)
    @IsString({ each: true })
    names: string[];

    @ApiProperty({ isArray: true, type: String })
    @ArrayMinSize(0)
    @IsString({ each: true })
    surnames: string[];

    @ApiProperty({ isArray: true, type: String })
    @ArrayMinSize(0)
    @IsString({ each: true })
    middleNames: string[];

    @ApiProperty({ isArray: true, enum: () => Genders, type: String })
    @ArrayMinSize(1)
    @ArrayMaxSize(2)
    @IsEnum(Genders, { each: true })
    genders: Genders[];

    @ApiProperty({ isArray: true, type: Number })
    @ArrayMinSize(0)
    @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
    ages: number[];

    @ApiProperty({ isArray: true, type: String })
    @ArrayMinSize(0)
    @IsString({ each: true })
    phones: string[];

    @ApiProperty({ isArray: true, type: String })
    @ArrayMinSize(0)
    @IsString({ each: true })
    parentPhones: string[];

    @ApiProperty({ isArray: true, type: String })
    @ArrayMinSize(0)
    @IsString({ each: true })
    parentFullNames: string[];

    @ApiProperty()
    @IsBoolean()
    debt: boolean;

    @ApiProperty({ isArray: true, type: String })
    @ArrayMinSize(0)
    @IsString({ each: true })
    discords: string[];

    @ApiProperty({ isArray: true, type: String })
    @ArrayMinSize(0)
    @IsMongoId({ each: true })
    salesFunnelSteps: string[];

    @ApiProperty({ isArray: true, type: String })
    @ArrayMinSize(0)
    @IsMongoId({ each: true })
    statuses: string[];

    @ApiProperty({ isArray: true, type: String })
    @ArrayMinSize(0)
    @IsMongoId({ each: true })
    groups: string[];

    @ApiProperty({ isArray: true, type: String })
    @ArrayMinSize(0)
    @IsMongoId({ each: true })
    tutors: string[];
}
