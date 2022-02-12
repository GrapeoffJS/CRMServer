import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
