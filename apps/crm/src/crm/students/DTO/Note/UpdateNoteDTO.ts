import { PartialType } from '@nestjs/swagger';
import { CreateNoteDTO } from './CreateNoteDTO';

export class UpdateNoteDTO extends PartialType(CreateNoteDTO) {}
