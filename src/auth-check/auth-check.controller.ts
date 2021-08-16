import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../authorization/authorization.guard';

@UseGuards(AuthorizationGuard)
@Controller('/auth-check')
export class AuthCheckController {
    @Get()
    public checkAuth() {}
}
