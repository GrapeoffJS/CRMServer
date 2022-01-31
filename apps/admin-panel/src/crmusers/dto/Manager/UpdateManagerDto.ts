import { PartialType } from '@nestjs/swagger';
import { CreateManagerDto } from './CreateManagerDto';

export class UpdateManagerDto extends PartialType(CreateManagerDto) {}
