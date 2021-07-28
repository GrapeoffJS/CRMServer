import { authDTO } from './DTO/authDTO';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async authenticate(@Body() authDTO: authDTO) {
        return await this.authService.authenticate(authDTO);
    }
}
