import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskTagDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    color: string;
}
