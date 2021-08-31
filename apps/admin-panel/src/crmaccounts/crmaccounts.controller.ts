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
import { MongoID } from '../../../DTO/MongoID';
import { PaginationDTO } from '../../../DTO/PaginationDTO';

@Controller(path)
export class CRMAccountsController {
    constructor(private readonly CRMAccountsService: CRMAccountsService) {}

    @Get()
    public async findAll(
        @Query() { limit, offset }: PaginationDTO,
        @Query('accountType') accountTypes: AccountTypes[],
        @Res() response: Response
    ) {
        const { accounts, count } = await this.CRMAccountsService.find(
            Number(limit),
            Number(offset),
            accountTypes
        );

        return response.header('Count', count).json(accounts);
    }

    @Get(':id')
    public async findOne(@Param() { id }: MongoID): Promise<CRMUser> {
        return await this.CRMAccountsService.findById(id);
    }

    @Post()
    public async create(
        @Body() createUserDTO: CreateCRMUserDTO
    ): Promise<CRMUser> {
        return await this.CRMAccountsService.create(createUserDTO);
    }

    @Patch(':id')
    public async edit(
        @Param() { id }: MongoID,
        @Body() updateCRMUserDTO: UpdateCRMUserDTO
    ) {
        return await this.CRMAccountsService.edit(id, updateCRMUserDTO);
    }

    @Delete(':login')
    public async delete(@Param('login') login: string): Promise<CRMUser> {
        return await this.CRMAccountsService.delete(login);
    }
}
