import CRMUser from './models/CRMUser.model';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Res
} from '@nestjs/common';
import { CreateCRMUserDTO } from './DTO/CreateCRMUserDTO';
import { CRMAccountsService } from './crmaccounts.service';
import { path } from './path';
import { Response } from 'express';

@Controller(path)
export class CRMAccountsController {
    constructor(private readonly crmAccountsService: CRMAccountsService) {}

    @Get()
    async findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('role') role: string,
        @Res() response: Response
    ): Promise<void> {
        if (!role) {
            return await this.crmAccountsService.findAll(
                Number(limit),
                Number(offset),
                response
            );
        }

        return await this.crmAccountsService.findAllByRole(
            Number(limit),
            Number(offset),
            role,
            response
        );
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<CRMUser> {
        return await this.crmAccountsService.findOne(id);
    }

    @Post()
    async create(@Body() data: CreateCRMUserDTO): Promise<CRMUser> {
        return await this.crmAccountsService.create(data);
    }

    @Delete(':login')
    async delete(@Param('login') login: string): Promise<CRMUser> {
        return await this.crmAccountsService.delete(login);
    }
}
