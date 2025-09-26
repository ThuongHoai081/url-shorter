import { Body, Controller, Post } from '@nestjs/common';
import { RegisterFormDto } from './dto/register-form.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginFormDto } from './dto/login-form.dto';
import { AuthResultDto } from './dto/auth-result.dto';
import { RefreshTokenFormDto } from './dto/refresh-token-form.dto';

@ApiTags('Auths')
@Controller('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterFormDto): Promise<AuthResultDto> {
    return AuthResultDto.fromAuthResult(
      await this.authService.register(
        RegisterFormDto.toRegisterForm(registerDto),
      ),
    );
  }

  @Post('login')
  async login(@Body() loginDto: LoginFormDto): Promise<AuthResultDto> {
    return AuthResultDto.fromAuthResult(
      await this.authService.login(LoginFormDto.toLoginForm(loginDto)),
    );
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenFormDto: RefreshTokenFormDto,
  ): Promise<AuthResultDto> {
    return AuthResultDto.fromAuthResult(
      await this.authService.refreshToken(
        RefreshTokenFormDto.toRefreshTokenForm(refreshTokenFormDto),
      ),
    );
  }
}
