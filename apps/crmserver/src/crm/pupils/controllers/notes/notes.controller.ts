import Pupil from '../../models/Pupil.model';
import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Req,
    UseGuards
} from '@nestjs/common';
import { NotesService } from '../../services/notes/notes.service';
import { path } from '../../path';
import { ActionPermissionsGuard } from 'apps/admin-panel/src/roles/action-permissions.guard';
import { ActionPermissions } from 'apps/admin-panel/src/roles/models/ActionPermissions';
import { decode } from 'jsonwebtoken';
import CRMUser from '../../../../../../admin-panel/src/crmaccounts/models/CRMUser.model';

@Controller(path)
export class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanCreateNote))
    @Post(':id/Notes')
    public async addNote(
        @Req() req,
        @Param('id') id: string,
        @Body('text') text: string
    ): Promise<Pupil> {
        const user = decode(req.headers.authorization.split(' ')[1]) as CRMUser;

        return await this.notesService.addNote(id, text, user);
    }

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanDeleteNote))
    @Delete(':id/Notes/:note_number')
    public async deleteNote(
        @Param('id') id: string,
        @Param('note_number') number: string
    ): Promise<Pupil> {
        return await this.notesService.deleteNote(id, Number(number));
    }
}
