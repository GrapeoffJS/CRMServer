import { PartialType } from '@nestjs/swagger';
import { CreateSupporterDto } from './CreateSupporterDto';

export class UpdateSupporterDto extends PartialType(CreateSupporterDto) {}
