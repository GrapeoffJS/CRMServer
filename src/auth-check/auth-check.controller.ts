import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller('/auth-check')
export class AuthCheckController {
    @Get()
    public checkAuth() {}
}
