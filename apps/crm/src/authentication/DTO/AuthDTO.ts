import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    login: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
}
