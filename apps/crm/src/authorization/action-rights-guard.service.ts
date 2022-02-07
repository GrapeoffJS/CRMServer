import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ActionRights } from '../../../admin-panel/src/roles/rights/action-rights';
import { RoleModel } from '../../../admin-panel/src/roles/models/role.model';
import { AuthorizedRequest } from './types/authorized-request';

@Injectable()
export class ActionRightsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

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

        return requiredActionRights.every(requiredRight =>
            (
                context.switchToHttp().getRequest<AuthorizedRequest>().user
                    .role as RoleModel
            ).actionRights.includes(requiredRight)
        );
    }
}
