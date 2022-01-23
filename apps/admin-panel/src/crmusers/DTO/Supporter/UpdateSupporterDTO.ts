import { PartialType } from '@nestjs/swagger';
import { CreateSupporterDTO } from './CreateSupporterDTO';

export class UpdateSupporterDTO extends PartialType(CreateSupporterDTO) {}
