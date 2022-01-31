import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/CreateNoteDto';
import { MongoID } from '../../../../../../utils/dto/MongoID';
import { StudentID } from '../crud/dto/StudentID';
import { NoteID } from './dto/NoteID';
import { UpdateNoteDto } from './dto/UpdateNoteDto';
import { NoteModel } from './models/Note.model';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { ActionRights } from '../../../../../admin-panel/src/roles/rights/ActionRights';

@ApiTags('CRM / Students / Notes')
@ApiBearerAuth()
@Controller('/crm/students')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @RequiredActionRights(ActionRights.CAN_CREATE_STUDENT_NOTE)
    @ApiCreatedResponse({ type: () => NoteModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => CreateNoteDto })
    @Post(':id/notes')
    async create(
        @Param() { id }: MongoID,
        @Body() createNoteDto: CreateNoteDto
    ) {
        return await this.notesService.create(id, createNoteDto);
    }

    @RequiredActionRights(ActionRights.CAN_EDIT_STUDENT_NOTE)
    @ApiOkResponse({ type: () => NoteModel })
    @ApiParam({ name: 'studentID', type: () => String })
    @ApiParam({ name: 'noteID', type: () => String })
    @Patch(':studentID/notes/:noteID')
    async update(
        @Param() { studentID }: StudentID,
        @Param() { noteID }: NoteID,
        @Body() updateNoteDto: UpdateNoteDto
    ) {
        return await this.notesService.update(studentID, noteID, updateNoteDto);
    }

    @RequiredActionRights(ActionRights.CAN_DELETE_STUDENT_NOTE)
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
