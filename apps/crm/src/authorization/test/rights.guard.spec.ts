import { ActionRightsGuard } from '../action-rights-guard.service';

describe('RightsGuard', () => {
  it('should be defined', () => {
    expect(new ActionRightsGuard()).toBeDefined();
  });
});
