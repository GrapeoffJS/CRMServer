import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
