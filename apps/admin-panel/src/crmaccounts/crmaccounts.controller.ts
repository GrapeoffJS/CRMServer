import CRMUser from './models/CRMUser.model';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Res
} from '@nestjs/common';
import { CreateCRMUserDTO } from './DTO/CreateCRMUserDTO';
import { CRMAccountsService } from './crmaccounts.service';
import { path } from './path';
import { Response } from 'express';
import { AccountTypes } from './models/AccountTypes';
import { UpdateCRMUserDTO } from './DTO/UpdateCRMUserDTO';

@Controller(path)
export class CRMAccountsController {
    constructor(private readonly crmAccountsService: CRMAccountsService) {}

    @Get()
    public async findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
        @Query('accountType') accountTypes: AccountTypes[],
        @Res() response: Response
    ) {
        return await this.crmAccountsService.findAll(
            Number(limit),
            Number(offset),
            accountTypes,
            response
        );
    }

    @Get(':id')
    public async findOne(@Param('id') id: string): Promise<CRMUser> {
        return await this.crmAccountsService.findOne(id);
    }

    @Post()
    public async create(
        @Body() createUserDTO: CreateCRMUserDTO
    ): Promise<CRMUser> {
        return await this.crmAccountsService.create(createUserDTO);
    }

    @Patch(':id')
    public async edit(
        @Param('id') id: string,
        @Body() updateCRMUserDTO: UpdateCRMUserDTO
    ) {
        return await this.crmAccountsService.edit(id, updateCRMUserDTO);
    }

    @Delete(':login')
    public async delete(@Param('login') login: string): Promise<CRMUser> {
        return await this.crmAccountsService.delete(login);
    }
}
