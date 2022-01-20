import { PartialType } from '@nestjs/mapped-types';
import { CreateTutorDTO } from './CreateTutorDTO';

export class UpdateTutorDTO extends PartialType(CreateTutorDTO) {}
