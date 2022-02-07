import { PartialType } from '@nestjs/swagger';
import { CreateSupporterDto } from './create-supporter.dto';

export class UpdateSupporterDto extends PartialType(CreateSupporterDto) {}
