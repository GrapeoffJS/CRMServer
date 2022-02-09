import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req
} from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags
} from '@nestjs/swagger';
import { CrudService } from './crud.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskModel } from './models/task.model';
import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { ActionRights } from '../../../../../admin-panel/src/roles/rights/action-rights';
import { SetResponseTransformationType } from '../../../authorization/set-response-transformation-type.decorator';
import { ResponseDto } from './dto/response.dto';
import { AuthorizedRequest } from '../../../authorization/types/authorized-request';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MongoId } from '../../../../../../utils/dto/mongo-id';
import { TagsFilterDto } from './dto/tags-filter.dto';

@ApiTags('CRM / Tasks')
@Controller('/crm/tasks')
export class CrudController {
    constructor(private readonly crudService: CrudService) {}

    @SetResponseTransformationType(TaskModel)
    @RequiredActionRights(ActionRights.CREATE_TASK)
    @ApiBody({ type: () => CreateTaskDto })
    @ApiCreatedResponse({ type: () => TaskModel })
    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        return await this.crudService.create(createTaskDto);
    }

    @SetResponseTransformationType(ResponseDto)
    @RequiredActionRights(ActionRights.SEE_TASK)
    @ApiOkResponse({ type: () => ResponseDto, isArray: true })
    @Get()
    async get(
        @Req() request: AuthorizedRequest,
        @Query()
        { tags }: TagsFilterDto
    ) {
        return await this.crudService.get(request.user.id, tags);
    }

    @SetResponseTransformationType(TaskModel)
    @RequiredActionRights(ActionRights.EDIT_TASK)
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateTaskDto })
    @ApiCreatedResponse({ type: () => TaskModel })
    @Patch(':id')
    async update(
        @Param() { id }: MongoId,
        @Body() updateTaskDto: UpdateTaskDto
    ) {
        return await this.crudService.update(id, updateTaskDto);
    }

    @SetResponseTransformationType(TaskModel)
    @RequiredActionRights(ActionRights.EDIT_TASK)
    @ApiParam({ name: 'id', type: () => String })
    @ApiCreatedResponse({ type: () => TaskModel })
    @Delete(':id')
    async delete(@Param() { id }: MongoId) {
        return await this.crudService.delete(id);
    }
}
