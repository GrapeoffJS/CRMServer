import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { path } from './path';
import { CRMAccountsService } from '../../../../admin-panel/src/crmaccounts/crmaccounts.service';
import { Response } from 'express';
import { AccountTypes } from '../../../../admin-panel/src/crmaccounts/models/AccountTypes';

@Controller(path)
export class TutorsController {
    constructor(private readonly CRMAccountsService: CRMAccountsService) {}

    @Get()
    public async findAll(
        @Query('limit') limit: number,
        @Query('offset') offset: number,
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

    public async findById(@Param('id') id: string) {
        return await this.CRMAccountsService.findById(id);
    }
}
