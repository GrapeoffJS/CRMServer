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
import { CrudService } from './crud.service';
import { CreateStudentDto } from './dto/CreateStudentDto';
import { PaginationDto } from '../../../../../../utils/dto/PaginationDto';
import { StudentModel } from './models/Student.model';
import { MongoID } from '../../../../../../utils/dto/MongoID';
import { UpdateStudentDto } from './dto/UpdateStudentDto';
import {
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { ActionRights } from '../../../../../admin-panel/src/roles/rights/ActionRights';
import { plainToClass } from 'class-transformer';
import { SetResponseTransformationType } from '../../../authorization/set-response-transformation-type.decorator';
import { PaginatedResponseDto } from './dto/PaginatedResponseDto';

@ApiTags('CRM / Students')
@ApiBearerAuth()
@Controller('/crm/students')
export class CrudController {
    constructor(private readonly studentsService: CrudService) {}

    @SetResponseTransformationType(StudentModel)
    @RequiredActionRights(ActionRights.CREATE_STUDENT)
    @ApiCreatedResponse({ type: () => CreateStudentDto })
    @ApiBody({ type: () => CreateStudentDto })
    @Post()
    async create(@Body() createStudentDto: CreateStudentDto) {
        return await this.studentsService.create(createStudentDto);
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
        return await this.studentsService.get(limit, offset);
    }

    @SetResponseTransformationType(StudentModel)
    @RequiredActionRights(ActionRights.SEE_STUDENT)
    @ApiOkResponse({ type: () => StudentModel })
    @ApiParam({ name: 'id', type: () => String })
    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.studentsService.getByID(id);
    }

    @SetResponseTransformationType(StudentModel)
    @RequiredActionRights(ActionRights.EDIT_STUDENT)
    @ApiOkResponse({ type: () => StudentModel })
    @ApiParam({ name: 'id', type: () => String })
    @ApiBody({ type: () => UpdateStudentDto })
    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateStudentDto: UpdateStudentDto
    ) {
        return await this.studentsService.update(id, updateStudentDto);
    }

    @SetResponseTransformationType(StudentModel)
    @RequiredActionRights(ActionRights.DELETE_STUDENT)
    @ApiOkResponse({ type: () => StudentModel })
    @ApiParam({ name: 'id', type: () => String })
    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.studentsService.delete(id);
    }
}
