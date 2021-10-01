import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    color: string;
}
