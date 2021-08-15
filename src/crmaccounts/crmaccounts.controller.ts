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
    public async findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('role') roles: string[],
        @Res() response: Response
    ) {
        return await this.crmAccountsService.findAll(
            Number(limit),
            Number(offset),
            roles,
            response
        );
    }

    @Get(':id')
    public async findOne(@Param('id') id: string): Promise<CRMUser> {
        return await this.crmAccountsService.findOne(id);
    }

    @Post()
    public async create(@Body() data: CreateCRMUserDTO): Promise<CRMUser> {
        return await this.crmAccountsService.create(data);
    }

    @Delete(':login')
    public async delete(@Param('login') login: string): Promise<CRMUser> {
        return await this.crmAccountsService.delete(login);
    }
}
