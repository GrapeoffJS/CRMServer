import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDTO } from './DTO/CreateNoteDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { StudentID } from '../DTO/StudentID';
import { NoteID } from './DTO/NoteID';
import { UpdateNoteDTO } from './DTO/UpdateNoteDTO';
import { NoteModel } from './models/Note.model';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';

@ApiTags('CRM / Students / Notes')
@ApiBearerAuth()
@Controller('/crm/students')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @ApiCreatedResponse({ type: () => NoteModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => CreateNoteDTO })
    @Post(':id/notes')
    async create(
        @Param() { id }: MongoID,
        @Body() createNoteDTO: CreateNoteDTO
    ) {
        return await this.notesService.create(id, createNoteDTO);
    }

    @ApiOkResponse({ type: () => NoteModel })
    @ApiParam({ name: 'studentID', type: () => String })
    @ApiParam({ name: 'noteID', type: () => String })
    @Patch(':studentID/notes/:noteID')
    async update(
        @Param() { studentID }: StudentID,
        @Param() { noteID }: NoteID,
        @Body() updateNoteDTO: UpdateNoteDTO
    ) {
        return await this.notesService.update(studentID, noteID, updateNoteDTO);
    }

    @ApiOkResponse({ type: () => NoteModel })
    @ApiParam({ name: 'studentID', type: () => String })
    @ApiParam({ name: 'noteID', type: () => String })
    @Delete(':studentID/notes/:noteID')
    async delete(
        @Param() { studentID }: StudentID,
        @Param() { noteID }: NoteID
    ) {
        return await this.notesService.delete(studentID, noteID);
    }
}
