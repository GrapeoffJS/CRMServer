import { RoleModel } from '@apps/admin-panel/roles/models/role.model';
import { ActionRights } from '@apps/admin-panel/roles/rights/action-rights';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthorizedRequest } from './types/authorized-request';

@Injectable()
export class ActionRightsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getClass(),
            context.getHandler()
        ]);

        const permissionsNotNeeded = this.reflector.get<boolean>(
            'rights-not-needed',
            context.getHandler()
        );

        if (isPublic || permissionsNotNeeded) {
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
