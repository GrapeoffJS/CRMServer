import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    password: string;
}
