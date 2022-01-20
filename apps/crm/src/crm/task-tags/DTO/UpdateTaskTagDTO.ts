import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskTagDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    color: string;
}
