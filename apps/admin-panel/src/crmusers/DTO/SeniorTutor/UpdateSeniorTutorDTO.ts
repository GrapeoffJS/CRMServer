import { PartialType } from '@nestjs/swagger';
import { CreateSeniorTutorDTO } from './CreateSeniorTutorDTO';

export class UpdateSeniorTutorDTO extends PartialType(CreateSeniorTutorDTO) {}
