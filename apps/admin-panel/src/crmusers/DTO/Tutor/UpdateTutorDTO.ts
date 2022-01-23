import { PartialType } from '@nestjs/swagger';
import { CreateTutorDTO } from './CreateTutorDTO';

export class UpdateTutorDTO extends PartialType(CreateTutorDTO) {}
