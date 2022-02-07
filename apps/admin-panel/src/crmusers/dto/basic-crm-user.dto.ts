import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BasicCrmUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    surname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    middleName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ description: 'Must be a mongo id' })
    @IsMongoId()
    role: string;
}
