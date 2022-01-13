import { Controller, Get } from '@nestjs/common';

@Controller('/auth-check')
export class AuthCheckController {
    @Get()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    checkAuth() {}
}
