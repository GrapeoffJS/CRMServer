import CRMUser from './models/CRMUser.model';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Res,
    UsePipes
} from '@nestjs/common';
import { createCRMUserDTO } from './DTO/createCRMUserDTO';
import { CRMAccountsService } from './crmaccounts.service';
import { Response } from 'express';

@Controller('CRMAccounts')
export class CRMAccountsController {
    constructor(private readonly CRMAccountsService: CRMAccountsService) {}

    @Get()
    async findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('role') role: string,
        @Res() response: Response
    ): Promise<void> {
        if (!role) {
            return await this.CRMAccountsService.findAll(
                Number(limit),
                Number(offset),
                response
            );
        }

        return await this.CRMAccountsService.findAllByRole(
            Number(limit),
            Number(offset),
            role,
            response
        );
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CRMUser> {
        return await this.CRMAccountsService.findOne(id);
    }

    @Post()
    async create(@Body() data: createCRMUserDTO): Promise<CRMUser> {
        return await this.CRMAccountsService.create(data);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<CRMUser> {
        return await this.CRMAccountsService.delete(id);
    }
}
