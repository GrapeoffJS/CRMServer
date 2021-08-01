import { AuthDTO } from './DTO/AuthDTO';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async authenticate(@Body() authDTO: AuthDTO) {
        return await this.authService.authenticate(authDTO);
    }
}
