import { SetMetadata } from '@nestjs/common';
import { ActionRights } from '../../../admin-panel/src/roles/rights/action-rights';

export const RequiredActionRights = (...args: ActionRights[]) =>
    SetMetadata('required-action-rights', args);
