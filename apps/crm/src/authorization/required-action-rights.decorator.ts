import { ActionRights } from '@apps/admin-panel/roles/rights/action-rights';
import { SetMetadata } from '@nestjs/common';

/**
 * Controllers or endpoints which marked with this decorator will require rights that passed into arguments
 * @param args Required rights
 */
export const RequiredActionRights = (...args: ActionRights[]) =>
    SetMetadata('required-action-rights', args);
