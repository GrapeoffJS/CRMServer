import { PartialType } from '@nestjs/mapped-types';
import { CreateManagerDTO } from './CreateManagerDTO';

export class UpdateManagerDTO extends PartialType(CreateManagerDTO) {}
