import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { loginUserDto } from 'src/users/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: loginUserDto) {
    return this.authService.login(body);
  }
}
