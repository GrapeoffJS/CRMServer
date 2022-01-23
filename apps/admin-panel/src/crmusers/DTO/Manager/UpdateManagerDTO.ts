import { PartialType } from '@nestjs/swagger';
import { CreateManagerDTO } from './CreateManagerDTO';

export class UpdateManagerDTO extends PartialType(CreateManagerDTO) {}
