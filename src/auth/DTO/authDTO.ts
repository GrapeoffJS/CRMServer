import { IsNotEmpty, IsString } from 'class-validator';

export class authDTO {
    @IsNotEmpty()
    @IsString()
    login: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
