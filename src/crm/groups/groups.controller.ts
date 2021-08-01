import { AuthGuard } from '../../auth/auth.guard';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    Res,
    UseGuards,
    UsePipes
} from '@nestjs/common';
import { Group } from './models/Group.model';
import { Schedule } from './models/Schedule';

@UseGuards(AuthGuard)
@Controller('/CRM/Groups')
export class GroupsController {
    
}
