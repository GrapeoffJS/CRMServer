import { Controller, Get } from '@nestjs/common';

@Controller('/auth-check')
export class AuthCheckController {
    @Get()
    checkAuth() {}
}
