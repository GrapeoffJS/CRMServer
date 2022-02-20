import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateNoteDto {
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    @MaxLength(3000)
    text: string;

    @ApiProperty({ required: true })
    @IsString()
    color: string;
}
