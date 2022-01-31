import { PartialType } from '@nestjs/swagger';
import { CreateStudentDto } from './CreateStudentDto';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
