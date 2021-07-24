import { ApiProperty } from '@nestjs/swagger';

export class createCRMUserDTO {
    name: string;
    surname: string;
    midname: string;
    login: string;
    password: string;
    role: string;
}
