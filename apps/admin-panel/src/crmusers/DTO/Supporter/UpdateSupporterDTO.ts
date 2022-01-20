import { PartialType } from '@nestjs/mapped-types';
import { CreateSupporterDTO } from './CreateSupporterDTO';

export class UpdateSupporterDTO extends PartialType(CreateSupporterDTO) {}
