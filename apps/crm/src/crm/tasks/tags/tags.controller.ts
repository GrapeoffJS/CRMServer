import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTaskTagDto } from './dto/create-task-tag.dto';
import { MongoId } from '../../../../../../utils/dto/mongo-id';
import { UpdateTaskTagDto } from './dto/update-task-tag.dto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { TaskTagModel } from './models/task-tag.model';
import { SetResponseTransformationType } from '../../../authorization/set-response-transformation-type.decorator';
import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { ActionRights } from '../../../../../admin-panel/src/roles/rights/action-rights';

@ApiTags('Task Tags')
@ApiBearerAuth()
@Controller('/crm/tasks/tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) {}

    @RequiredActionRights(ActionRights.CREATE_TASK_TAG)
    @SetResponseTransformationType(TaskTagModel)
    @ApiBody({ type: () => CreateTaskTagDto })
    @ApiCreatedResponse({ type: () => TaskTagModel })
    @Post()
    async create(@Body() createTaskTagDto: CreateTaskTagDto) {
        return await this.tagsService.create(createTaskTagDto);
    }

    @RequiredActionRights(ActionRights.SEE_TASK_TAG)
    @SetResponseTransformationType(TaskTagModel)
    @ApiOkResponse({ type: () => TaskTagModel, isArray: true })
    @Get()
    async get() {
        return await this.tagsService.get();
    }

    @RequiredActionRights(ActionRights.EDIT_TASK_TAG)
    @SetResponseTransformationType(TaskTagModel)
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateTaskTagDto })
    @ApiCreatedResponse({ type: () => TaskTagModel })
    @Patch(':id')
    async update(
        @Param() { id }: MongoId,
        @Body() updateTaskTagDto: UpdateTaskTagDto
    ) {
        return await this.tagsService.update(id, updateTaskTagDto);
    }

    @RequiredActionRights(ActionRights.DELETE_TASK_TAG)
    @SetResponseTransformationType(TaskTagModel)
    @ApiParam({ name: 'id', type: () => String })
    @ApiCreatedResponse({ type: () => TaskTagModel })
    @Delete('id')
    async delete(@Param() { id }: MongoId) {
        return await this.tagsService.delete(id);
    }
}
