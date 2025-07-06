import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    console.log(dto);
    const user = await this.authService.validateUser(dto.userEmail, dto.userPassword ,dto.role);
    return this.authService.login(user);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
