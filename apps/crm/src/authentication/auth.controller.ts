import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '../authorization/public.decorator';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('Authorization')
@Public()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiBody({ type: () => AuthDto })
    @Post()
    async auth(@Body() authDto: AuthDto) {
        return await this.authService.auth(authDto);
    }

    @ApiBody({ type: () => RefreshDto })
    @Post('/refresh')
    async refresh(@Body() refreshDto: RefreshDto) {
        return await this.authService.refresh(refreshDto);
    }
}
