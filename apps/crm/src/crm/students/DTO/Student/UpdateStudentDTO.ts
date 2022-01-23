import { PartialType } from '@nestjs/swagger';
import { CreateStudentDTO } from './CreateStudentDTO';

export class UpdateStudentDTO extends PartialType(CreateStudentDTO) {}
