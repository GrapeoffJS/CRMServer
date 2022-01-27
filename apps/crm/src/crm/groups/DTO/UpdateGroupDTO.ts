import { PartialType } from '@nestjs/swagger';
import { CreateGroupDTO } from './CreateGroupDTO';

export class UpdateGroupDTO extends PartialType(CreateGroupDTO) {}
