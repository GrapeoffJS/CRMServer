import { PartialType } from '@nestjs/swagger';
import { CreateStatusDto } from './CreateStatusDto';

export class UpdateStatusDto extends PartialType(CreateStatusDto) {}
