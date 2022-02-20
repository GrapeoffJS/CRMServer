import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, ArrayUnique, IsMongoId } from 'class-validator';

export class StudentsDto {
    @ApiProperty()
    @IsMongoId({ each: true })
    @ArrayNotEmpty()
    @ArrayUnique()
    students: string[];
}
