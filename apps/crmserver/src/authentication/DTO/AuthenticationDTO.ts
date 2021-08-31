import { IsNotEmpty, IsString } from 'class-validator';

export class AuthenticationDTO {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
