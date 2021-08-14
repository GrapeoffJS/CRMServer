import { AuthGuard } from '../auth/auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('auth-check')
export class AuthCheckController {
    @Get()
    check() {
        return;
    }
}
