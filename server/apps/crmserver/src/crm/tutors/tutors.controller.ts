import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { path } from './path';
import { Response } from 'express';
import { PaginationDTO } from '../../../../DTO/PaginationDTO';
import { MongoID } from '../../../../DTO/MongoID';
import { TutorsService } from './tutors.service';

@Controller(path)
export class TutorsController {
    constructor(private readonly TutorsService: TutorsService) {}

    @Get()
    public async findAll(
        @Query() { limit, offset }: PaginationDTO,
        @Query('subject') subjects: string[],
        @Res() response: Response
    ) {
        const { accounts, count } = await this.TutorsService.findAll(
            limit,
            offset,
            subjects || null
        );

        return response.header('Count', count).json(accounts);
    }

    @Get(':id')
    public async findById(@Param() { id }: MongoID) {
        return await this.TutorsService.findById(id);
    }
}
