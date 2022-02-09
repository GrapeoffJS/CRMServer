import { PartialType } from '@nestjs/swagger';
import { CreateTaskTagDto } from './create-task-tag.dto';

export class UpdateTaskTagDto extends PartialType(CreateTaskTagDto) {}
