import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDTO } from './CreateStudentDTO';

export class UpdateStudentDTO extends PartialType(CreateStudentDTO) {}
