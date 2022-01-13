import { Controller, Get, Query, Req } from '@nestjs/common';
import { CurrentUserTasksService } from './current-user-tasks.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import CRMUser from '../../../../../admin-panel/src/crmaccounts/models/CRMUser.model';
import { DocumentType } from '@typegoose/typegoose';
import { path } from './path';

@Controller(path)
export class CurrentUserTasksController {
    constructor(
        private readonly currentUserTasksService: CurrentUserTasksService,
        private readonly JWTService: JwtService
    ) {}

    @Get()
    async findAll(@Query('tag') tags, @Req() request: Request) {
        const { id } = this.JWTService.decode(
            request.headers.authorization.split(' ')[1]
        ) as DocumentType<CRMUser>;

        if (typeof tags === 'string') {
            tags = Array(tags);
        }

        return await this.currentUserTasksService.findAll(tags, id);
    }
}
