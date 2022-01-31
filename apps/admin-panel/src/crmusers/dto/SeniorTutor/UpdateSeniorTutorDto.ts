import { PartialType } from '@nestjs/swagger';
import { CreateSeniorTutorDto } from './CreateSeniorTutorDto';

export class UpdateSeniorTutorDto extends PartialType(CreateSeniorTutorDto) {}
