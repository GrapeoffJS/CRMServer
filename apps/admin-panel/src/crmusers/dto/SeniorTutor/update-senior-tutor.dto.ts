import { PartialType } from '@nestjs/swagger';

import { CreateSeniorTutorDto } from './create-senior-tutor.dto';

export class UpdateSeniorTutorDto extends PartialType(CreateSeniorTutorDto) {}
