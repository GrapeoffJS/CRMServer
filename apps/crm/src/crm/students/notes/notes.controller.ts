import {
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDTO } from './DTO/CreateNoteDTO';
import { MongoID } from '../../../../../../utils/DTO/MongoID';
import { StudentID } from '../DTO/StudentID';
import { NoteID } from './DTO/NoteID';
import { UpdateNoteDTO } from './DTO/UpdateNoteDTO';
import { NoteModel } from './models/Note.model';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthenticationGuard } from '../../../auth/authentication/authentication.guard';

@ApiTags('Students/Notes')
@ApiBearerAuth()
@UseGuards(AuthenticationGuard)
@Controller('/crm/students')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => CreateNoteDTO })
    @Post(':id/notes')
    async create(
        @Param() { id }: MongoID,
        @Body() createNoteDTO: CreateNoteDTO
    ): Promise<NoteModel> {
        return await this.notesService.create(id, createNoteDTO);
    }

    @ApiParam({ name: 'studentID', type: () => String })
    @ApiParam({ name: 'noteID', type: () => String })
    @Patch(':studentID/notes/:noteID')
    async update(
        @Param() { studentID }: StudentID,
        @Param() { noteID }: NoteID,
        @Body() updateNoteDTO: UpdateNoteDTO
    ): Promise<NoteModel> {
        return await this.notesService.update(studentID, noteID, updateNoteDTO);
    }

    @ApiParam({ name: 'studentID', type: () => String })
    @ApiParam({ name: 'noteID', type: () => String })
    @Delete(':studentID/notes/:noteID')
    async delete(
        @Param() { studentID }: StudentID,
        @Param() { noteID }: NoteID
    ): Promise<NoteModel> {
        return await this.notesService.delete(studentID, noteID);
    }
}
