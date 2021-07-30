import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('auth-check')
export class AuthCheckController {
    @Get()
    check() {
        return;
    }
}
