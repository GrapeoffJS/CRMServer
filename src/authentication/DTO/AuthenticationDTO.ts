import { IsString, IsNotEmpty } from 'class-validator';

export class AuthenticationDTO {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
