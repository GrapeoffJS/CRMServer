import { PartialType } from '@nestjs/swagger';
import { CreateTutorDto } from './CreateTutorDto';

export class UpdateTutorDto extends PartialType(CreateTutorDto) {}
