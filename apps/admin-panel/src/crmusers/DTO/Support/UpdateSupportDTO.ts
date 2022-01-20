import { PartialType } from '@nestjs/mapped-types';
import { CreateSupportDTO } from './CreateSupportDTO';

export class UpdateSupportDTO extends PartialType(CreateSupportDTO) {}
