import { IsMongoId, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MaxLength(3000)
    text: string;

    @ApiProperty()
    @IsString()
    color: string;
}
