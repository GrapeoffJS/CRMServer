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
import { createGroupDTO } from './DTO/createGroupDTO';
import { CreateGroupValidationPipe } from './pipes/create-group-validation.pipe';
import { filterDTO } from './DTO/filterDTO';
import { Group } from './models/Group.model';
import { GroupsService } from './groups.service';
import { Response } from 'express';
import { Schedule } from './models/Schedule';
import { updateGroupDTO } from './DTO/updateGroupDTO';

@UseGuards(AuthGuard)
@Controller('/CRM/Groups')
export class GroupsController {
    constructor(private readonly GroupsService: GroupsService) {}

    @UsePipes(CreateGroupValidationPipe)
    @Post()
    async create(@Body() createGroupDTO: createGroupDTO): Promise<Group> {
        return await this.GroupsService.create(createGroupDTO);
    }

    @Post('/getByIds')
    async findByIds(@Body() ids: string[]): Promise<Group[]> {
        return await this.GroupsService.findByIds(ids);
    }

    @Post(':id/Pupils')
    async addPupils(@Param('id') id: string, @Body() pupilsToAdd: string[]) {
        return await this.GroupsService.addPupils(id, pupilsToAdd);
    }

    @Post(':id/Schedule')
    async addGlobalSchedule(
        @Param('id') id: string,
        @Body() schedule: Schedule[]
    ) {
        return await this.GroupsService.addGlobalSchedule(id, schedule);
    }

    @Put(':id/Pupils/:pupilId/Schedule')
    async updatePupilSchedule(
        @Param('id') groupId: string,
        @Param('pupilId') pupilId: string,
        @Body() schedule: Schedule[]
    ) {
        return await this.GroupsService.updatePupilSchedule(
            groupId,
            pupilId,
            schedule
        );
    }

    @Post('/find')
    async findAll(
        @Query('limit') limit = 0,
        @Query('offset') offset = 0,
        @Body('filters') filters: filterDTO,
        @Res() response: Response
    ) {
        return await this.GroupsService.findAll(
            Number(limit) || 0,
            Number(offset) || 0,
            filters,
            response
        );
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Group> {
        return await this.GroupsService.findById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Group> {
        return await this.GroupsService.delete(id);
    }

    @Delete(':id/Pupils/:pupilId')
    async deletePupil(
        @Param('id') id: string,
        @Param('pupilId') pupilId: string
    ) {
        return await this.GroupsService.deletePupil(id, pupilId);
    }

    @Patch(':id')
    async edit(
        @Param('id') id: string,
        @Body() updateGroupDTO: updateGroupDTO
    ): Promise<Group> {
        return await this.GroupsService.edit(id, updateGroupDTO);
    }

    @Post(':id/Teacher')
    async addTutor(
        @Param('id') groupId: string,
        @Query('tutor_id') tutorId: string
    ): Promise<Group> {
        return await this.GroupsService.addTutor(groupId, tutorId);
    }
}
