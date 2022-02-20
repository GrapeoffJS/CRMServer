import { ActionRights } from '@apps/admin-panel/roles/rights/action-rights';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { MongoId } from '@utils/dto/mongo-id';
import { PaginationDto } from '@utils/dto/pagination.dto';

import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { SetResponseTransformationType } from '../../../authorization/set-response-transformation-type.decorator';
import { CrudService } from './crud.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentModel } from './models/student.model';

@ApiTags('Students')
@ApiBearerAuth()
@Controller('/crm/students')
export class CrudController {
    constructor(private readonly crudService: CrudService) {}

    @SetResponseTransformationType(StudentModel)
    @RequiredActionRights(ActionRights.CREATE_STUDENT)
    @ApiCreatedResponse({ type: () => CreateStudentDto })
    @ApiBody({ type: () => CreateStudentDto })
    @Post()
    async create(@Body() createStudentDto: CreateStudentDto) {
        return await this.crudService.create(createStudentDto);
    }

    @SetResponseTransformationType(PaginatedResponseDto)
    @RequiredActionRights(ActionRights.SEE_STUDENT)
    @ApiOkResponse({
        type: () => StudentModel,
        isArray: true
    })
    @ApiQuery({ name: 'limit', type: () => Number })
    @ApiQuery({ name: 'offset', type: () => Number })
    @Get()
    async get(@Query() { limit, offset }: PaginationDto) {
        return await this.crudService.get(limit, offset);
    }

    @SetResponseTransformationType(StudentModel)
    @RequiredActionRights(ActionRights.SEE_STUDENT)
    @ApiOkResponse({ type: () => StudentModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoId) {
        return await this.crudService.getByID(id);
    }

    @SetResponseTransformationType(StudentModel)
    @RequiredActionRights(ActionRights.EDIT_STUDENT)
    @ApiOkResponse({ type: () => StudentModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateStudentDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoId,
        @Body() updateStudentDto: UpdateStudentDto
    ) {
        return await this.crudService.update(id, updateStudentDto);
    }

    @SetResponseTransformationType(StudentModel)
    @RequiredActionRights(ActionRights.DELETE_STUDENT)
    @ApiOkResponse({ type: () => StudentModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoId) {
        return await this.crudService.delete(id);
    }
}
