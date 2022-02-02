import { ArrayNotEmpty, ArrayUnique, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudentsDto {
    @ApiProperty()
    @IsMongoId({ each: true })
    @ArrayNotEmpty()
    @ArrayUnique()
    students: string[];
}
