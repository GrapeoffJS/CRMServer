import { ActionPermissions } from './models/ActionPermissions';
import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExtendedRequest } from '../../authorization/ExtendedRequest';
import { Role } from './models/Role.model';

export const ActionPermissionsGuard = (
    ...requiredActionPermissions: ActionPermissions[]
) => {
    class ActionPermissionsGuardMixin implements CanActivate {
        canActivate(
            context: ExecutionContext
        ): boolean | Promise<boolean> | Observable<boolean> {
            const role = context.switchToHttp().getRequest<ExtendedRequest>()
                .user.role as Role;

            const actionPermissions = role.actionPermissions;

            for (let i = 0; i < requiredActionPermissions.length; i++) {
                if (!actionPermissions.includes(requiredActionPermissions[i]))
                    return false;
            }

            return true;
        }
    }

    return mixin(ActionPermissionsGuardMixin);
};
