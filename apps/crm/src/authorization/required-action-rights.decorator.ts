import { SetMetadata } from '@nestjs/common';
import { ActionRights } from '../../../admin-panel/src/roles/rights/action-rights';

/**
 * Controllers or endpoints which marked with this decorator will require rights that passed into arguments
 * @param args Required rights
 */
export const RequiredActionRights = (...args: ActionRights[]) =>
    SetMetadata('required-action-rights', args);
