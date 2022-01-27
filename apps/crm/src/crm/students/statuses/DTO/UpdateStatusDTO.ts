import { PartialType } from '@nestjs/swagger';
import { CreateStatusDTO } from './CreateStatusDTO';

export class UpdateStatusDTO extends PartialType(CreateStatusDTO) {}
