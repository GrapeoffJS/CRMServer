import Pupil from './models/Pupil.model';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
    UsePipes
} from '@nestjs/common';
import { createPupilDTO } from './DTO/createPupilDTO';
import { CreatePupilValidationPipe } from './pipes/create-pupil-validation.pipe';
import { filterDTO } from './DTO/filterDTO';
import { PupilsService } from './pupils.service';
import { Request, Response } from 'express';

@UseGuards(AuthGuard)
@Controller('/CRM/Pupils')
export class PupilsController {
    constructor(private readonly PupilsService: PupilsService) {}

    @UsePipes(CreatePupilValidationPipe)
    @Post()
    async create(@Body() data: createPupilDTO): Promise<Pupil> {
        return await this.PupilsService.create(data);
    }

    @Post(':id/Payment')
    async createPayment(
        @Param('id') id: string,
        @Query('amount') amount: string,
        @Query('subscription') sub: string,
        @Req() req: Request
    ) {
        return await this.PupilsService.createPayment(
            id,
            Number(amount),
            sub,
            req
        );
    }

    @Post('/find')
    async findAll(
        @Query('limit') limit: number = 0,
        @Query('offset') offset: number = 0,
        @Body('filters') filters: filterDTO,
        @Res() response: Response
    ) {
        return await this.PupilsService.findAll(
            Number(limit) || 0,
            Number(offset) || 0,
            filters,
            response
        );
    }

    @Get('/:id')
    async findById(@Param('id') id: string): Promise<Pupil> {
        return await this.PupilsService.findById(id);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string): Promise<Pupil> {
        return await this.PupilsService.delete(id);
    }

    @Patch('/:id')
    async edit(
        @Param('id') id: string,
        @Body() createPupilDTO: createPupilDTO
    ): Promise<Pupil> {
        return await this.PupilsService.edit(id, createPupilDTO);
    }

    @Post(':id/Notes')
    async addNote(
        @Req() req,
        @Param('id') id: string,
        @Body('text') text: string
    ): Promise<Pupil> {
        return await this.PupilsService.addNote(id, text, req);
    }

    @Delete(':id/Notes/:note_number')
    async deleteNote(
        @Param('id') id: string,
        @Param('note_number') number: string
    ): Promise<Pupil> {
        return await this.PupilsService.deleteNote(id, Number(number));
    }
}
