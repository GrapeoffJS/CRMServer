import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { path } from './path';
import { CRMAccountsService } from '../../../../admin-panel/src/crmaccounts/crmaccounts.service';
import { Response } from 'express';
import { AccountTypes } from '../../../../admin-panel/src/crmaccounts/models/AccountTypes';
import { PaginationDTO } from '../../../../DTO/PaginationDTO';
import { MongoID } from '../../../../DTO/MongoID';

@Controller(path)
export class TutorsController {
    constructor(private readonly CRMAccountsService: CRMAccountsService) {}

    @Get()
    public async findAll(
        @Query() { limit, offset }: PaginationDTO,
        @Query('accountType') accountTypes: AccountTypes[],
        @Res() response: Response
    ) {
        const { accounts, count } = await this.CRMAccountsService.findAll(
            limit,
            offset,
            accountTypes
        );

        return response.header('Count', count).json(accounts);
    }

    public async findById(@Param() { id }: MongoID) {
        return await this.CRMAccountsService.findById(id);
    }
}
