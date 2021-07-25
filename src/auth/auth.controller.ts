import { authDTO } from './DTO/authDTO';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthValidationPipe } from './pipes/auth-validation.pipe';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UsePipes(AuthValidationPipe)
    @Post()
    async authenticate(@Body() authDTO: authDTO) {
        return await this.authService.authenticate(authDTO);
    }
}
