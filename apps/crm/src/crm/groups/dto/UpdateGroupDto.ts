import { PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './CreateGroupDto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {}
