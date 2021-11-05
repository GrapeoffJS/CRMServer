import { Controller, Get, Req } from '@nestjs/common';
import { CurrentUserTasksService } from './current-user-tasks.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import CRMUser from '../../../../../admin-panel/src/crmaccounts/models/CRMUser.model';
import { DocumentType } from '@typegoose/typegoose';
import { path } from './path';

@Controller(path)
export class CurrentUserTasksController {
    constructor(
        private readonly CurrentUserTasksService: CurrentUserTasksService,
        private readonly JWTService: JwtService
    ) {}

    @Get()
    public async findAll(@Req() request: Request) {
        const { id } = this.JWTService.decode(
            request.headers.authorization.split(' ')[1]
        ) as DocumentType<CRMUser>;

        return await this.CurrentUserTasksService.findAll(id);
    }
}
