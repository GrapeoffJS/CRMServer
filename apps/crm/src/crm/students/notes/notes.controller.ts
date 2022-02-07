import {
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post,
    Req
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { MongoId } from '../../../../../../utils/dto/mongo-id';
import { StudentId } from '../crud/dto/student-id';
import { NoteId } from './dto/note-id';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NoteModel } from './models/note.model';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { ActionRights } from '../../../../../admin-panel/src/roles/rights/action-rights';
import { AuthorizedRequest } from '../../../authorization/types/authorized-request';
import { SetResponseTransformationType } from '../../../authorization/set-response-transformation-type.decorator';

@ApiTags('CRM / Students / Notes')
@ApiBearerAuth()
@Controller('/crm/students')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @RequiredActionRights(ActionRights.CREATE_STUDENT_NOTE)
    @SetResponseTransformationType(NoteModel)
    @ApiCreatedResponse({ type: () => NoteModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => CreateNoteDto })
    @Post(':id/notes')
    async create(
        @Param() { id }: MongoId,
        @Body() createNoteDto: CreateNoteDto,
        @Req() request: AuthorizedRequest
    ) {
        return await this.notesService.create(
            request.user.id,
            id,
            createNoteDto
        );
    }

    @RequiredActionRights(ActionRights.EDIT_STUDENT_NOTE)
    @SetResponseTransformationType(NoteModel)
    @ApiOkResponse({ type: () => NoteModel })
    @ApiParam({ name: 'studentID', type: () => String })
    @ApiParam({ name: 'noteID', type: () => String })
    @Patch(':studentID/notes/:noteID')
    async update(
        @Param() { studentID }: StudentId,
        @Param() { noteID }: NoteId,
        @Body() updateNoteDto: UpdateNoteDto
    ) {
        return await this.notesService.update(studentID, noteID, updateNoteDto);
    }

    @RequiredActionRights(ActionRights.DELETE_STUDENT_NOTE)
    @SetResponseTransformationType(NoteModel)
    @ApiOkResponse({ type: () => NoteModel })
    @ApiParam({ name: 'studentID', type: () => String })
    @ApiParam({ name: 'noteID', type: () => String })
    @Delete(':studentID/notes/:noteID')
    async delete(
        @Param() { studentID }: StudentId,
        @Param() { noteID }: NoteId
    ) {
        return await this.notesService.delete(studentID, noteID);
    }
}
