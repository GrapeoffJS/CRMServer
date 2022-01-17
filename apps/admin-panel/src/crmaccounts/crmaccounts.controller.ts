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
import { Response } from 'express';
import { UpdateCRMUserDTO } from './DTO/UpdateCRMUserDTO';
import { MongoID } from '../../../../utils/DTO/MongoID';
import { PaginationDTO } from '../../../../utils/DTO/PaginationDTO';

@Controller('/admin-panel/crm-accounts')
export class CRMAccountsController {
    constructor(private readonly crmAccountsService: CRMAccountsService) {}

    @Get()
    async get(
        @Query() { limit, offset }: PaginationDTO,
        @Res() response: Response
    ) {
        const { accounts, count } = await this.crmAccountsService.get(
            limit,
            offset
        );

        return response.header('Count', count.toString()).json(accounts);
    }

    @Get(':id')
    async getByID(@Param() { id }: MongoID) {
        return await this.crmAccountsService.getByID(id);
    }

    @Post()
    async create(@Body() createUserDTO: CreateCRMUserDTO) {
        return await this.crmAccountsService.create(createUserDTO);
    }

    @Patch(':id')
    async update(
        @Param() { id }: MongoID,
        @Body() updateCRMUserDTO: UpdateCRMUserDTO
    ) {
        return await this.crmAccountsService.update(id, updateCRMUserDTO);
    }

    @Delete(':id')
    async delete(@Param() { id }: MongoID) {
        return await this.crmAccountsService.delete(id);
    }
}
