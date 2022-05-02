import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class BasicCrmUserDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    surname: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    middleName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ description: 'Must be a mongo id', required: true })
    @IsMongoId()
    role: string;
}
