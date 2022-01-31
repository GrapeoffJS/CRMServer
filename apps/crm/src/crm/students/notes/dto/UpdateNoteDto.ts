import { PartialType } from '@nestjs/swagger';
import { CreateNoteDto } from './CreateNoteDto';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
