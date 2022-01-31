import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
    @ApiProperty()
    @IsMongoId()
    author: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty()
    @IsString()
    color: string;
}
