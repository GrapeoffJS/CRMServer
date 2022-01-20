import { ActionPermissions } from './models/ActionPermissions';
import { CanActivate, ExecutionContext, mixin } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExtendedRequest } from '../../../crm/src/authorization/ExtendedRequest';
import { Role } from './models/Role.model';

export const ActionPermissionsGuard = (
    ...requiredActionPermissions: ActionPermissions[]
) => {
    class ActionPermissionsGuardMixin implements CanActivate {
        canActivate(
            context: ExecutionContext
        ): boolean | Promise<boolean> | Observable<boolean> {
            const user = context
                .switchToHttp()
                .getRequest<ExtendedRequest>().user;

            const actionPermissions = (user.role as Role)?.actionPermissions;

            if (actionPermissions === null) {
                return false;
            }

            for (const item of requiredActionPermissions) {
                if (!actionPermissions.includes(item)) return false;
            }

            return true;
        }
    }

    return mixin(ActionPermissionsGuardMixin);
};
