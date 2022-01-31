import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ActionRights } from '../../../admin-panel/src/roles/rights/ActionRights';
import { CRMUserModel } from '../../../admin-panel/src/crmusers/models/CRMUser.model';
import { Request } from 'express';
import { RoleModel } from '../../../admin-panel/src/roles/models/Role.model';

@Injectable()
export class ActionRightsGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly jwtService: JwtService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isControllerPublic = this.reflector.get<boolean>(
            'isControllerPublic',
            context.getClass()
        );

        const isEndpointPublic = this.reflector.get<boolean>(
            'isEndpointPublic',
            context.getHandler()
        );

        if (isEndpointPublic || isControllerPublic) {
            return true;
        }

        const requiredActionRights = this.reflector.get<ActionRights[]>(
            'required-action-rights',
            context.getHandler()
        );

        const user = await this.jwtService.verifyAsync<CRMUserModel>(
            context
                .switchToHttp()
                .getRequest<Request>()
                .headers.authorization.split(' ')[1]
        );

        return requiredActionRights.every(requiredRight =>
            (user.role as RoleModel).actionRights.includes(requiredRight)
        );
    }
}
