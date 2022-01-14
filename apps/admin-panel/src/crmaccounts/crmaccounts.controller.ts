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
    constructor(private readonly crmAccountsService: CRMAccountsService) {}

    @Get()
    async findAll(
        @Query() { limit, offset }: PaginationDTO,
        @Query('accountType') accountTypes: AccountTypes[],
        @Res() response: Response
    ) {
        const { accounts, count } = await this.crmAccountsService.findAll(
            Number(limit),
            Number(offset),
            accountTypes
        );

        return response.header('Count', count).json(accounts);
    }

    @Get(':id')
    async findById(@Param() { id }: MongoID) {
        return await this.crmAccountsService.findById(id);
    }

    @Post()
    async create(@Body() createUserDTO: CreateCRMUserDTO) {
        return await this.crmAccountsService.create(createUserDTO);
    }

    @Patch(':id')
    async edit(
        @Param() { id }: MongoID,
        @Body() updateCRMUserDTO: UpdateCRMUserDTO
    ) {
        return await this.crmAccountsService.edit(id, updateCRMUserDTO);
    }

    @Delete(':login')
    async delete(@Param('login') login: string) {
        return await this.crmAccountsService.delete(login);
    }
}
