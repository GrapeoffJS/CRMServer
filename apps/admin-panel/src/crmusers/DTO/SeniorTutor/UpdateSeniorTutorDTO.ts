import { PartialType } from '@nestjs/mapped-types';
import { CreateSeniorTutorDTO } from './CreateSeniorTutorDTO';

export class UpdateSeniorTutorDTO extends PartialType(CreateSeniorTutorDTO) {}
